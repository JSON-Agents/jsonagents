import chalk from 'chalk';
import { validateUri } from '../utils/validator';

export async function testUriCommand(uri: string) {
  console.log(chalk.blue(`🧪 Testing URI format\n`));
  console.log(chalk.gray(`URI: ${uri}\n`));

  const isValid = validateUri(uri);

  if (isValid) {
    console.log(chalk.green('✓ URI format is valid'));
    
    // Parse and display components
    const match = uri.match(/^ajson:\/\/([^\/]+)(\/.*)?$/);
    if (match) {
      console.log(chalk.gray('\nComponents:'));
      console.log(chalk.gray(`  Scheme: ajson://`));
      console.log(chalk.gray(`  Authority: ${match[1]}`));
      console.log(chalk.gray(`  Path: ${match[2] || '/'}`));
      
      // Show HTTPS resolution
      const httpsUrl = `https://${match[1]}/.well-known/json-agents${match[2] || ''}`;
      console.log(chalk.gray(`\nHTTPS Resolution:`));
      console.log(chalk.gray(`  ${httpsUrl}`));
    }
  } else {
    console.log(chalk.red('✗ URI format is invalid'));
    console.log(chalk.yellow('\nURI must:'));
    console.log(chalk.yellow('  - Start with ajson://'));
    console.log(chalk.yellow('  - Include an authority (domain)'));
    console.log(chalk.yellow('  - Optionally include a path'));
    console.log(chalk.yellow('\nExample: ajson://example.com/agents/my-agent'));
    process.exit(1);
  }
}
