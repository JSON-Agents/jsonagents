import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// This would normally load from the actual schema file
const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

export interface ValidationResult {
  valid: boolean;
  errors: Array<{
    path: string;
    message: string;
  }>;
}

export async function validateManifest(manifest: any): Promise<ValidationResult> {
  try {
    // Basic validation - in production, this would use the full JSON Schema
    const errors: Array<{ path: string; message: string }> = [];

    if (!manifest.manifest_version) {
      errors.push({ path: '/manifest_version', message: 'manifest_version is required' });
    }

    if (!manifest.profiles || !Array.isArray(manifest.profiles)) {
      errors.push({ path: '/profiles', message: 'profiles must be an array' });
    }

    if (!manifest.agent) {
      errors.push({ path: '/agent', message: 'agent is required' });
    } else {
      if (!manifest.agent.id) {
        errors.push({ path: '/agent/id', message: 'agent.id is required' });
      }
      if (!manifest.agent.name) {
        errors.push({ path: '/agent/name', message: 'agent.name is required' });
      }
      if (!manifest.agent.version) {
        errors.push({ path: '/agent/version', message: 'agent.version is required' });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  } catch (error: any) {
    return {
      valid: false,
      errors: [{ path: '/', message: error.message }],
    };
  }
}

export function validateUri(uri: string): boolean {
  return uri.startsWith('ajson://') && uri.length > 9;
}

export function validatePolicyExpression(expression: string): boolean {
  try {
    // Basic syntax validation
    // In production, this would use a proper parser
    return expression.length > 0 && !expression.includes('undefined');
  } catch {
    return false;
  }
}
