#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import * as fs from 'fs';
import { JsonAgentsValidator } from './validator';
import { validateAjsonUri, validateAndParseAjsonUri } from './uri';
import { validatePolicy } from './policy';

const program = new Command();

program
  .name('jsonagents')
  .description('JSON Agents manifest validator')
  .version('1.0.0');

// Validate command
program
  .command('validate')
  .description('Validate a JSON Agents manifest file')
  .argument('<file>', 'Path to the manifest file')
  .option('-v, --verbose', 'Show detailed validation information')
  .option('--profiles <profiles...>', 'Check for specific profiles')
  .action((file: string, options: any) => {
    try {
      const validator = new JsonAgentsValidator({ verbose: options.verbose });
      const result = validator.validateFile(file);

      if (result.valid) {
        console.log(chalk.green('✓ Manifest is valid'));

        // Display warnings if any
        if (result.warnings && result.warnings.length > 0) {
          console.log(chalk.yellow('\n⚠ Warnings:'));
          result.warnings.forEach(warning => console.log(chalk.yellow(`  ${warning}`)));
        }

        if (options.verbose) {
          const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
          const info = validator.getValidationInfo(content);
          console.log(chalk.blue('\nManifest Information:'));
          console.log(`  Profiles: ${info.profiles.join(', ') || 'none'}`);
          console.log(`  Capabilities: ${info.capabilities}`);
          console.log(`  Tools: ${info.tools}`);
          console.log(`  Extensions: ${info.extensions.join(', ') || 'none'}`);
        }

        // Check required profiles if specified
        if (options.profiles) {
          const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
          const profileCheck = validator.checkProfiles(content, options.profiles);
          
          if (!profileCheck.valid) {
            console.log(chalk.yellow(`\n⚠ ${profileCheck.errors?.[0] || 'Profile check failed'}`));
            process.exit(1);
          } else {
            console.log(chalk.green(`✓ All required profiles present`));
          }
        }

        process.exit(0);
      } else {
        console.log(chalk.red('✗ Manifest is invalid'));
        if (result.errors && result.errors.length > 0) {
          console.log(chalk.red('\nErrors:'));
          result.errors.forEach(error => console.log(chalk.red(`  ${error}`)));
        }
        if (result.warnings && result.warnings.length > 0) {
          console.log(chalk.yellow('\nWarnings:'));
          result.warnings.forEach(warning => console.log(chalk.yellow(`  ${warning}`)));
        }
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

// Validate URI command
program
  .command('validate-uri')
  .description('Validate an ajson:// URI')
  .argument('<uri>', 'The URI to validate')
  .option('-v, --verbose', 'Show detailed URI information')
  .action((uri: string, options: any) => {
    const result = validateAndParseAjsonUri(uri);

    if (result.valid) {
      console.log(chalk.green('✓ URI is valid'));

      if (options.verbose) {
        console.log(chalk.blue('\nURI Components:'));
        console.log(`  Domain: ${result.domain}`);
        console.log(`  Namespace: ${result.namespace}`);
        console.log(`  Identifier: ${result.identifier}`);
        console.log(`  HTTPS URL: ${result.httpsUrl}`);
      }

      process.exit(0);
    } else {
      console.log(chalk.red('✗ URI is invalid'));
      if (result.message) {
        console.log(chalk.red(`  ${result.message}`));
      }
      process.exit(1);
    }
  });

// Validate policy command
program
  .command('validate-policy')
  .description('Validate a policy expression')
  .argument('<expression>', 'The policy expression to validate')
  .option('-v, --verbose', 'Show parsed AST')
  .action((expression: string, options: any) => {
    const result = validatePolicy(expression);

    if (result.valid) {
      console.log(chalk.green('✓ Policy expression is valid'));

      if (options.verbose && result.ast) {
        console.log(chalk.blue('\nParsed AST:'));
        console.log(JSON.stringify(result.ast, null, 2));
      }

      process.exit(0);
    } else {
      console.log(chalk.red('✗ Policy expression is invalid'));
      if (result.message) {
        console.log(chalk.red(`  ${result.message}`));
      }
      process.exit(1);
    }
  });

// Info command
program
  .command('info')
  .description('Display information about a manifest')
  .argument('<file>', 'Path to the manifest file')
  .action((file: string) => {
    try {
      const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const validator = new JsonAgentsValidator();
      const info = validator.getValidationInfo(content);

      console.log(chalk.blue('Manifest Information:'));
      console.log(`  Name: ${content.name || 'N/A'}`);
      console.log(`  Version: ${content.version || 'N/A'}`);
      console.log(`  Schema: ${content.$schema || 'N/A'}`);
      console.log(`  Valid: ${info.valid ? chalk.green('Yes') : chalk.red('No')}`);
      console.log(`\n  Profiles: ${info.profiles.join(', ') || 'none'}`);
      console.log(`  Capabilities: ${info.capabilities}`);
      console.log(`  Tools: ${info.tools}`);
      console.log(`  Extensions: ${info.extensions.join(', ') || 'none'}`);

      if (content.runtime) {
        console.log(chalk.blue('\nRuntime:'));
        console.log(`  Type: ${content.runtime.type || 'N/A'}`);
        console.log(`  Sandboxed: ${content.runtime.sandboxed || false}`);
      }

      if (content.governance) {
        console.log(chalk.blue('\nGovernance:'));
        console.log(`  Policies: ${content.governance.policies?.length || 0}`);
        console.log(`  Signature: ${content.governance.signature ? 'Present' : 'None'}`);
      }

      process.exit(info.valid ? 0 : 1);
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

// Format command
program
  .command('format')
  .description('Format and pretty-print a manifest')
  .argument('<file>', 'Path to the manifest file')
  .option('-o, --output <file>', 'Output file (default: stdout)')
  .option('--indent <spaces>', 'Number of spaces for indentation', '2')
  .action((file: string, options: any) => {
    try {
      const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const formatted = JSON.stringify(content, null, parseInt(options.indent));

      if (options.output) {
        fs.writeFileSync(options.output, formatted + '\n');
        console.log(chalk.green(`✓ Formatted manifest written to ${options.output}`));
      } else {
        console.log(formatted);
      }

      process.exit(0);
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program.parse();
