#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { validateCommand } from './commands/validate';
import { convertCommand } from './commands/convert';
import { infoCommand } from './commands/info';
import { formatCommand } from './commands/format';
import { searchCommand } from './commands/search';
import { fetchCommand } from './commands/fetch';
import { testPolicyCommand } from './commands/test-policy';
import { testUriCommand } from './commands/test-uri';

const program = new Command();

program
  .name('jsonagents')
  .description('Comprehensive CLI tool for JSON Agents')
  .version('1.0.0');

// Init Command
program
  .command('init')
  .description('Create a new agent manifest interactively')
  .option('-t, --template <type>', 'Template type (router, qa, summarization, etc.)')
  .option('-n, --name <name>', 'Agent name')
  .option('-p, --profiles <profiles>', 'Comma-separated profiles (core,exec,gov,graph)')
  .option('-o, --output <file>', 'Output file path', 'manifest.json')
  .action(initCommand);

// Validate Command
program
  .command('validate <files...>')
  .description('Validate JSON Agents manifests')
  .option('-v, --verbose', 'Verbose output')
  .option('-w, --watch', 'Watch mode - revalidate on file changes')
  .option('-p, --profiles <profiles>', 'Validate specific profiles only')
  .action(validateCommand);

// Convert Command
program
  .command('convert <input>')
  .description('Convert between JSON and YAML formats')
  .option('-o, --output <file>', 'Output file path')
  .option('-f, --format <format>', 'Output format (json, yaml)', 'json')
  .action(convertCommand);

// Format Command
program
  .command('format <file>')
  .description('Format and pretty-print manifests')
  .option('-i, --indent <spaces>', 'Indentation spaces', '2')
  .option('-m, --minify', 'Minify output')
  .option('-o, --output <file>', 'Output file (default: overwrites input)')
  .action(formatCommand);

// Info Command
program
  .command('info <file>')
  .description('Display manifest information')
  .option('-f, --format <format>', 'Output format (table, json, yaml)', 'table')
  .option('--show-deps', 'Show dependencies')
  .action(infoCommand);

// List Command
program
  .command('list <type> <file>')
  .description('List manifest components (capabilities, tools, profiles)')
  .action((type, file) => {
    console.log(chalk.blue(`Listing ${type} in ${file}`));
    // Implementation in info command
  });

// Search Command
program
  .command('search <query>')
  .description('Search for agents in registry')
  .option('-c, --category <category>', 'Filter by category')
  .option('-p, --profile <profile>', 'Filter by profile')
  .option('-r, --registry <url>', 'Registry URL')
  .action(searchCommand);

// Fetch Command
program
  .command('fetch <uri>')
  .description('Fetch agent manifest from registry')
  .option('-o, --output <file>', 'Output file path')
  .option('-r, --registry <url>', 'Registry URL')
  .action(fetchCommand);

// Test Policy Command
program
  .command('test-policy <expression>')
  .description('Test policy expression')
  .option('-c, --context <json>', 'Context as JSON string')
  .option('-f, --context-file <file>', 'Context from file')
  .action(testPolicyCommand);

// Test URI Command
program
  .command('test-uri <uri>')
  .description('Validate URI format')
  .action(testUriCommand);

// New Command (alias for init with template)
program
  .command('new')
  .description('Create a new agent from template')
  .option('-t, --template <type>', 'Template type', 'custom')
  .option('-n, --name <name>', 'Agent name')
  .option('-p, --profiles <profiles>', 'Comma-separated profiles')
  .option('-o, --output <file>', 'Output file path', 'manifest.json')
  .action(initCommand);

program.parse();
