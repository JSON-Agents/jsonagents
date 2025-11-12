import chalk from 'chalk';
import fs from 'fs/promises';
import Table from 'cli-table3';
import yaml from 'js-yaml';

interface InfoOptions {
  format?: 'table' | 'json' | 'yaml';
  showDeps?: boolean;
}

export async function infoCommand(file: string, options: InfoOptions = {}) {
  try {
    const content = await fs.readFile(file, 'utf-8');
    const manifest = JSON.parse(content);

    if (options.format === 'json') {
      console.log(JSON.stringify(manifest, null, 2));
      return;
    }

    if (options.format === 'yaml') {
      console.log(yaml.dump(manifest));
      return;
    }

    // Table format (default)
    console.log(chalk.blue.bold('\n📋 Manifest Information\n'));

    const table = new Table({
      head: [chalk.cyan('Property'), chalk.cyan('Value')],
      colWidths: [25, 55],
      wordWrap: true,
    });

    table.push(
      ['Version', manifest.manifest_version || 'N/A'],
      ['Profiles', Array.isArray(manifest.profiles) ? manifest.profiles.join(', ') : 'N/A'],
      ['Agent ID', manifest.agent?.id || 'N/A'],
      ['Agent Name', manifest.agent?.name || 'N/A'],
      ['Agent Version', manifest.agent?.version || 'N/A'],
      ['Description', manifest.agent?.description || 'N/A'],
      ['Capabilities', manifest.capabilities?.length || 0],
      ['Tools', manifest.tools?.length || 0],
      ['Runtime', manifest.runtime?.type || 'N/A'],
      ['Security', manifest.security ? 'Configured' : 'None'],
      ['Policies', manifest.policies?.length || 0],
      ['Graph Nodes', manifest.graph?.nodes?.length || 0],
    );

    console.log(table.toString());

    if (manifest.capabilities && manifest.capabilities.length > 0) {
      console.log(chalk.blue('\n🎯 Capabilities:\n'));
      manifest.capabilities.forEach((cap: any, i: number) => {
        console.log(chalk.gray(`  ${i + 1}. ${cap.type || cap.id}: ${cap.description || 'No description'}`));
      });
    }

    if (manifest.tools && manifest.tools.length > 0) {
      console.log(chalk.blue('\n🔧 Tools:\n'));
      manifest.tools.forEach((tool: any, i: number) => {
        console.log(chalk.gray(`  ${i + 1}. ${tool.name} (${tool.type})`));
        if (tool.description) {
          console.log(chalk.gray(`     ${tool.description}`));
        }
      });
    }

    console.log();
  } catch (error: any) {
    console.error(chalk.red('Error reading manifest:'), error.message);
    process.exit(1);
  }
}
