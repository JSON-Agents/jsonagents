import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { templates } from '../templates';
import { validateManifest } from '../utils/validator';

interface InitOptions {
  template?: string;
  name?: string;
  profiles?: string;
  output?: string;
}

export async function initCommand(options: InitOptions = {}) {
  console.log(chalk.blue.bold('\n🚀 JSON Agents Manifest Generator\n'));

  try {
    // If template is provided via CLI, skip prompts
    if (options.template && options.name) {
      await generateFromTemplate(options);
      return;
    }

    // Interactive prompts
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'What type of agent would you like to create?',
        choices: [
          { name: '🔀 Router Agent - Multi-agent routing hub', value: 'router' },
          { name: '💬 QA Agent - Question answering', value: 'qa' },
          { name: '📝 Summarization Agent - Document summarizer', value: 'summarization' },
          { name: '✨ Generation Agent - Content generation', value: 'generation' },
          { name: '🔍 Retrieval Agent - Information retrieval', value: 'retrieval' },
          { name: '🏷️  Classification Agent - Classification', value: 'classification' },
          { name: '📊 Extraction Agent - Entity extraction', value: 'extraction' },
          { name: '🛠️  Custom - Start from scratch', value: 'custom' },
        ],
        default: options.template || 'router',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Agent name:',
        default: options.name || 'My Agent',
        validate: (input: string) => input.trim().length > 0 || 'Name is required',
      },
      {
        type: 'input',
        name: 'id',
        message: 'Agent URI (ajson://):',
        default: (answers: any) => 
          `ajson://example.com/agents/${answers.name.toLowerCase().replace(/\s+/g, '-')}`,
        validate: (input: string) => 
          input.startsWith('ajson://') || 'URI must start with ajson://',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default: 'An AI agent',
      },
      {
        type: 'checkbox',
        name: 'profiles',
        message: 'Select profiles:',
        choices: [
          { name: 'core (required)', value: 'core', checked: true, disabled: true },
          { name: 'exec (runtime metadata)', value: 'exec' },
          { name: 'gov (security & policies)', value: 'gov' },
          { name: 'graph (multi-agent topology)', value: 'graph' },
        ],
        default: options.profiles?.split(',') || ['core'],
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: '1.0.0',
      },
      {
        type: 'confirm',
        name: 'addCapabilities',
        message: 'Add capabilities?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'addTools',
        message: 'Add tools?',
        default: true,
        when: (answers: any) => answers.addCapabilities,
      },
      {
        type: 'input',
        name: 'output',
        message: 'Output file:',
        default: options.output || 'manifest.json',
      },
    ]);

    // Generate manifest
    const manifest = await buildManifest(answers);

    // Write to file
    const outputPath = path.resolve(answers.output);
    await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2), 'utf-8');

    console.log(chalk.green(`\n✓ Created ${answers.output}`));

    // Validate
    const validation = await validateManifest(manifest);
    if (validation.valid) {
      console.log(chalk.green('✓ Validated successfully\n'));
    } else {
      console.log(chalk.yellow('⚠ Validation warnings:'));
      validation.errors.forEach((err: any) => {
        console.log(chalk.yellow(`  - ${err.message}`));
      });
    }

    console.log(chalk.blue(`\nNext steps:`));
    console.log(chalk.gray(`  1. Review ${answers.output}`));
    console.log(chalk.gray(`  2. Customize capabilities and tools`));
    console.log(chalk.gray(`  3. Run: jsonagents validate ${answers.output}`));
    console.log(chalk.gray(`  4. Launch TUI: jsonagents tui ${answers.output}\n`));

  } catch (error: any) {
    console.error(chalk.red('Error creating manifest:'), error.message);
    process.exit(1);
  }
}

async function generateFromTemplate(options: InitOptions) {
  const template = options.template || 'custom';
  const name = options.name || 'My Agent';
  const profiles = options.profiles?.split(',') || ['core'];
  const output = options.output || 'manifest.json';

  const manifest = {
    manifest_version: '1.0',
    profiles,
    agent: {
      id: `ajson://example.com/agents/${name.toLowerCase().replace(/\s+/g, '-')}`,
      name,
      version: '1.0.0',
      description: `A ${template} agent`,
    },
    capabilities: templates[template as keyof typeof templates]?.capabilities || [],
    tools: templates[template as keyof typeof templates]?.tools || [],
  };

  const outputPath = path.resolve(output);
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log(chalk.green(`✓ Created ${output} from ${template} template`));
}

async function buildManifest(answers: any): Promise<any> {
  const manifest: any = {
    manifest_version: '1.0',
    profiles: answers.profiles,
    agent: {
      id: answers.id,
      name: answers.name,
      version: answers.version,
      description: answers.description,
    },
  };

  // Add template-specific capabilities if selected
  const templateData = templates[answers.template as keyof typeof templates];
  if (templateData && answers.addCapabilities) {
    manifest.capabilities = templateData.capabilities;
  }

  if (templateData && answers.addTools) {
    manifest.tools = templateData.tools || [];
  }

  // Add runtime if exec profile is selected
  if (answers.profiles.includes('exec')) {
    manifest.runtime = {
      type: 'node',
      version: '>=18.0.0',
      entrypoint: 'index.js',
    };
  }

  // Add security and policies if gov profile is selected
  if (answers.profiles.includes('gov')) {
    manifest.security = {
      sandbox: 'process',
    };
    manifest.policies = [];
  }

  // Add graph structure if graph profile is selected
  if (answers.profiles.includes('graph')) {
    manifest.graph = {
      nodes: [
        {
          id: 'main',
          ref: answers.id,
        },
      ],
      edges: [],
    };
  }

  return manifest;
}
