import chalk from 'chalk';
import axios from 'axios';
import fs from 'fs/promises';

interface FetchOptions {
  output?: string;
  registry?: string;
}

export async function fetchCommand(uri: string, options: FetchOptions = {}) {
  const registryUrl = options.registry || 'https://registry.jsonagents.org';
  
  console.log(chalk.blue(`📥 Fetching: ${uri}\n`));

  try {
    // Try registry first
    const response = await axios.get(`${registryUrl}/resolve`, {
      params: { uri },
    });

    const manifest = response.data;
    const output = options.output || `${manifest.agent?.name || 'agent'}.json`.replace(/\s+/g, '-');

    await fs.writeFile(output, JSON.stringify(manifest, null, 2), 'utf-8');

    console.log(chalk.green(`✓ Fetched manifest successfully`));
    console.log(chalk.gray(`  Agent: ${manifest.agent?.name}`));
    console.log(chalk.gray(`  Saved to: ${output}`));
  } catch (error: any) {
    if (error.code === 'ENOTFOUND' || error.response?.status === 404) {
      // Try direct HTTPS resolution as fallback
      try {
        const httpsUrl = uri.replace('ajson://', 'https://') + '/manifest.json';
        const response = await axios.get(httpsUrl);
        const manifest = response.data;
        const output = options.output || 'manifest.json';

        await fs.writeFile(output, JSON.stringify(manifest, null, 2), 'utf-8');
        console.log(chalk.green(`✓ Fetched manifest via HTTPS`));
        console.log(chalk.gray(`  Saved to: ${output}`));
      } catch {
        console.error(chalk.red('Error: Could not resolve URI'));
        console.error(chalk.yellow('Registry service unavailable and direct HTTPS resolution failed'));
      }
    } else {
      console.error(chalk.red('Error fetching manifest:'), error.message);
    }
  }
}
