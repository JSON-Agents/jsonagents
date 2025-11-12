import Ajv, { ValidateFunction, ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import * as fs from 'fs';
import * as path from 'path';
import { validateAjsonUri } from './uri';
import { validatePolicy } from './policy';

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
  message?: string;
}

export interface ValidationOptions {
  strict?: boolean;
  allErrors?: boolean;
  verbose?: boolean;
}

/**
 * JSON Agents Validator
 * 
 * Validates Portable Agent Manifests (PAM) against the JSON Agents specification.
 */
export class JsonAgentsValidator {
  private ajv: Ajv;
  private mainSchema: any;
  private validators: Map<string, ValidateFunction> = new Map();

  constructor(options: ValidationOptions = {}) {
    this.ajv = new Ajv({
      strict: false, // Allow unknown keywords
      allErrors: options.allErrors !== false,
      verbose: options.verbose || false,
      validateFormats: true,
      validateSchema: false, // Don't validate the schemas themselves
    });

    addFormats(this.ajv);
    this.loadSchemas();
  }

  /**
   * Load all JSON Agent schemas
   */
  private loadSchemas(): void {
    // Determine schema directory (relative to repository root)
    const repoRoot = path.resolve(__dirname, '../../..');
    const schemaDir = path.join(repoRoot, 'standard', 'schema');

    // Load main schema
    const mainSchemaPath = path.join(schemaDir, 'json-agents.json');
    if (fs.existsSync(mainSchemaPath)) {
      this.mainSchema = JSON.parse(fs.readFileSync(mainSchemaPath, 'utf-8'));
      
      // Add schema with its $id (Ajv will use $id automatically)
      this.ajv.addSchema(this.mainSchema);
    }

    // Load capability schemas
    const capabilitiesDir = path.join(schemaDir, 'capabilities');
    if (fs.existsSync(capabilitiesDir)) {
      const capabilityFiles = fs.readdirSync(capabilitiesDir);
      for (const file of capabilityFiles) {
        if (file.endsWith('.json')) {
          const filePath = path.join(capabilitiesDir, file);
          const schema = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          this.ajv.addSchema(schema);
        }
      }
    }

    // Load extension schemas
    const extensionsDir = path.join(schemaDir, 'extensions');
    if (fs.existsSync(extensionsDir)) {
      const extensionFiles = fs.readdirSync(extensionsDir);
      for (const file of extensionFiles) {
        if (file.endsWith('.json')) {
          const filePath = path.join(extensionsDir, file);
          const schema = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          this.ajv.addSchema(schema);
        }
      }
    }
  }

  /**
   * Validate a manifest against the JSON Agents schema
   */
  validate(manifest: any, options: { strict?: boolean } = {}): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!this.mainSchema) {
      return {
        valid: false,
        errors: ['Main schema not loaded. Ensure schema files are available.'],
      };
    }

    // Use the schema $id as the reference
    const schemaId = this.mainSchema.$id || 'json-agents';
    const validator = this.ajv.getSchema(schemaId);
    if (!validator) {
      return {
        valid: false,
        errors: ['Validator not initialized'],
      };
    }

    // JSON Schema validation
    const valid = validator(manifest);

    if (!valid && validator.errors) {
      errors.push(...validator.errors.map(err => {
        const path = err.instancePath || 'root';
        const message = err.message || 'Unknown error';
        return `Schema error at '${path}': ${message}`;
      }));
    }

    // Validate agent.id URI
    if (manifest?.agent?.id) {
      const uriResult = validateAjsonUri(manifest.agent.id);
      if (!uriResult.valid && uriResult.message) {
        errors.push(`Agent ID: ${uriResult.message}`);
      }
    }

    // Validate tool URIs
    if (manifest?.tools && Array.isArray(manifest.tools)) {
      manifest.tools.forEach((tool: any, i: number) => {
        if (tool.id && tool.id.startsWith('ajson://')) {
          const uriResult = validateAjsonUri(tool.id);
          if (!uriResult.valid && uriResult.message) {
            errors.push(`Tool[${i}] ID: ${uriResult.message}`);
          }
        }
      });
    }

    // Validate graph node refs
    if (manifest?.graph?.nodes && Array.isArray(manifest.graph.nodes)) {
      manifest.graph.nodes.forEach((node: any, i: number) => {
        if (node.ref && node.ref.startsWith('ajson://')) {
          const uriResult = validateAjsonUri(node.ref);
          if (!uriResult.valid && uriResult.message) {
            errors.push(`Graph node[${i}] ref: ${uriResult.message}`);
          }
        }
      });
    }

    // Validate policy expressions
    if (manifest?.policies && Array.isArray(manifest.policies)) {
      manifest.policies.forEach((policy: any, i: number) => {
        if (policy.where) {
          const policyResult = validatePolicy(policy.where);
          if (!policyResult.valid && policyResult.message) {
            errors.push(`Policy[${i}] where: ${policyResult.message}`);
          }
        }
      });
    }

    // Validate graph edge conditions
    if (manifest?.graph?.edges && Array.isArray(manifest.graph.edges)) {
      manifest.graph.edges.forEach((edge: any, i: number) => {
        if (edge.condition) {
          const policyResult = validatePolicy(edge.condition);
          if (!policyResult.valid && policyResult.message) {
            errors.push(`Edge[${i}] condition: ${policyResult.message}`);
          }
        }
      });
    }

    // Warnings
    if (manifest && !manifest.capabilities) {
      warnings.push('No capabilities declared');
    }

    // Apply strict mode
    if (options.strict && warnings.length > 0) {
      errors.push(...warnings);
      warnings.length = 0;
    }

    const isValid = errors.length === 0;

    return {
      valid: isValid,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
      message: isValid ? undefined : errors.join('\n'),
    };
  }

  /**
   * Validate a manifest from a file path
   */
  validateFile(filePath: string): ValidationResult {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const manifest = JSON.parse(content);
      return this.validate(manifest);
    } catch (error) {
      return {
        valid: false,
        message: `Failed to read or parse file: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * Format validation errors into a human-readable message
   */
  private formatErrors(errors: ErrorObject[]): string {
    return errors
      .map((err) => {
        const path = err.instancePath || '/';
        const message = err.message || 'Unknown error';
        const params = err.params ? JSON.stringify(err.params) : '';
        return `  - ${path}: ${message} ${params}`.trim();
      })
      .join('\n');
  }

  /**
   * Get detailed validation information
   */
  getValidationInfo(manifest: any): {
    valid: boolean;
    profiles: string[];
    capabilities: number;
    tools: number;
    extensions: string[];
    errors?: string[];
    warnings?: string[];
  } {
    const result = this.validate(manifest);
    
    return {
      valid: result.valid,
      profiles: manifest.profiles || [],
      capabilities: manifest.capabilities?.length || 0,
      tools: manifest.tools?.length || 0,
      extensions: Object.keys(manifest.extensions || {}),
      errors: result.errors,
      warnings: result.warnings,
    };
  }

  /**
   * Check if a manifest conforms to specific profiles
   */
  checkProfiles(manifest: any, requiredProfiles: string[]): ValidationResult {
    const manifestProfiles = manifest.profiles || [];
    const missingProfiles = requiredProfiles.filter(
      (profile) => !manifestProfiles.includes(profile)
    );

    if (missingProfiles.length > 0) {
      return {
        valid: false,
        errors: [`Missing required profiles: ${missingProfiles.join(', ')}`],
      };
    }

    return { valid: true };
  }
}

export default JsonAgentsValidator;
