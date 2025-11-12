import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

interface FormatOptions {
  indent?: string;
  minify?: boolean;
  output?: string;
}

export async function formatCommand(file: string, options: FormatOptions = {}) {
  try {
    const filePath = path.resolve(file);
    const content = await fs.readFile(filePath, 'utf-8');
    const manifest = JSON.parse(content);

    let formatted: string;
    if (options.minify) {
      formatted = JSON.stringify(manifest);
    } else {
      const indent = parseInt(options.indent || '2');
      formatted = JSON.stringify(manifest, null, indent);
    }

    const outputPath = options.output || filePath;
    await fs.writeFile(outputPath, formatted, 'utf-8');

    console.log(chalk.green(`✓ Formatted ${file}`));
    if (options.minify) {
      console.log(chalk.gray('  Style: minified'));
    } else {
      console.log(chalk.gray(`  Indent: ${options.indent || 2} spaces`));
    }
  } catch (error: any) {
    console.error(chalk.red('Error formatting file:'), error.message);
    process.exit(1);
  }
}
