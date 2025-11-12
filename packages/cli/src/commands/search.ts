import chalk from 'chalk';
import axios from 'axios';

interface SearchOptions {
  category?: string;
  profile?: string;
  registry?: string;
}

export async function searchCommand(query: string, options: SearchOptions = {}) {
  const registryUrl = options.registry || 'https://registry.jsonagents.org';
  
  console.log(chalk.blue(`🔍 Searching for: ${query}\n`));

  try {
    const params = new URLSearchParams({
      q: query,
      ...(options.category && { category: options.category }),
      ...(options.profile && { profile: options.profile }),
    });

    const response = await axios.get(`${registryUrl}/search?${params}`);
    const results = response.data;

    if (results.length === 0) {
      console.log(chalk.yellow('No agents found matching your search.'));
      return;
    }

    console.log(chalk.green(`Found ${results.length} agent(s):\n`));

    results.forEach((agent: any, i: number) => {
      console.log(chalk.cyan(`${i + 1}. ${agent.name}`));
      console.log(chalk.gray(`   URI: ${agent.uri}`));
      console.log(chalk.gray(`   Description: ${agent.description || 'N/A'}`));
      console.log(chalk.gray(`   Category: ${agent.category || 'N/A'}`));
      console.log(chalk.gray(`   Version: ${agent.version || 'N/A'}`));
      console.log();
    });
  } catch (error: any) {
    if (error.code === 'ENOTFOUND' || error.response?.status === 404) {
      console.error(chalk.yellow('Registry service not available. Using mock data.'));
      console.log(chalk.gray('\nExample agents:'));
      console.log(chalk.cyan('  1. Router Hub'));
      console.log(chalk.gray('     URI: ajson://jsonagents.org/examples/router-hub'));
      console.log(chalk.gray('     Description: Multi-agent routing hub'));
    } else {
      console.error(chalk.red('Error searching registry:'), error.message);
    }
  }
}
