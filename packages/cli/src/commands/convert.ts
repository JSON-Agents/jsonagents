import chalk from 'chalk';
import fs from 'fs/promises';
import yaml from 'js-yaml';
import path from 'path';

interface ConvertOptions {
  output?: string;
  format?: 'json' | 'yaml';
}

export async function convertCommand(input: string, options: ConvertOptions = {}) {
  try {
    const inputPath = path.resolve(input);
    const content = await fs.readFile(inputPath, 'utf-8');
    const inputExt = path.extname(inputPath).toLowerCase();

    // Determine input format
    let manifest: any;
    if (inputExt === '.yaml' || inputExt === '.yml') {
      manifest = yaml.load(content);
    } else {
      manifest = JSON.parse(content);
    }

    // Determine output format
    const outputFormat = options.format || (inputExt === '.json' ? 'yaml' : 'json');
    const outputPath = options.output || input.replace(/\.(json|ya?ml)$/, `.${outputFormat === 'yaml' ? 'yaml' : 'json'}`);

    // Convert
    let outputContent: string;
    if (outputFormat === 'yaml') {
      outputContent = yaml.dump(manifest, { indent: 2, lineWidth: 120 });
    } else {
      outputContent = JSON.stringify(manifest, null, 2);
    }

    // Write output
    await fs.writeFile(outputPath, outputContent, 'utf-8');

    console.log(chalk.green(`✓ Converted ${input} to ${outputPath}`));
    console.log(chalk.gray(`  Format: ${inputExt.slice(1)} → ${outputFormat}`));
  } catch (error: any) {
    console.error(chalk.red('Error converting file:'), error.message);
    process.exit(1);
  }
}
