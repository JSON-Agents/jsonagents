import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { validateManifest } from '../utils/validator';
import ora from 'ora';
import chokidar from 'chokidar';

interface ValidateOptions {
  verbose?: boolean;
  watch?: boolean;
  profiles?: string;
}

export async function validateCommand(files: string[], options: ValidateOptions = {}) {
  if (options.watch) {
    return watchMode(files, options);
  }

  let allValid = true;

  for (const file of files) {
    const result = await validateFile(file, options);
    if (!result) {
      allValid = false;
    }
  }

  process.exit(allValid ? 0 : 1);
}

async function validateFile(filePath: string, options: ValidateOptions): Promise<boolean> {
  const spinner = ora(`Validating ${filePath}`).start();

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const manifest = JSON.parse(content);

    const result = await validateManifest(manifest);

    if (result.valid) {
      spinner.succeed(chalk.green(`${filePath} is valid`));
      return true;
    } else {
      spinner.fail(chalk.red(`${filePath} has errors`));
      
      if (options.verbose) {
        console.log(chalk.red('\nValidation Errors:'));
        result.errors.forEach((error) => {
          console.log(chalk.red(`  ${error.path}: ${error.message}`));
        });
      }
      return false;
    }
  } catch (error: any) {
    spinner.fail(chalk.red(`Failed to validate ${filePath}`));
    console.error(chalk.red(`  Error: ${error.message}`));
    return false;
  }
}

async function watchMode(files: string[], options: ValidateOptions) {
  console.log(chalk.blue('👀 Watch mode enabled. Press Ctrl+C to exit.\n'));

  // Initial validation
  for (const file of files) {
    await validateFile(file, options);
  }

  console.log(chalk.gray('\nWatching for changes...\n'));

  // Watch for file changes
  const watcher = chokidar.watch(files, {
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on('change', async (filePath) => {
    console.log(chalk.blue(`\n⟳ File changed: ${filePath}`));
    await validateFile(filePath, options);
    console.log(chalk.gray('\nWatching for changes...\n'));
  });

  // Keep process running
  await new Promise(() => {});
}
