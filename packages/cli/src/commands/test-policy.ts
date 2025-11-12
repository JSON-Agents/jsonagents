import chalk from 'chalk';
import fs from 'fs/promises';

interface TestPolicyOptions {
  context?: string;
  contextFile?: string;
}

export async function testPolicyCommand(expression: string, options: TestPolicyOptions = {}) {
  console.log(chalk.blue(`🧪 Testing policy expression\n`));
  console.log(chalk.gray(`Expression: ${expression}\n`));

  try {
    let context: any = {};

    if (options.contextFile) {
      const content = await fs.readFile(options.contextFile, 'utf-8');
      context = JSON.parse(content);
    } else if (options.context) {
      context = JSON.parse(options.context);
    }

    console.log(chalk.gray('Context:'));
    console.log(chalk.gray(JSON.stringify(context, null, 2)));
    console.log();

    // Basic expression evaluation (simplified)
    // In production, this would use a proper policy expression parser
    const result = evaluateExpression(expression, context);

    if (result) {
      console.log(chalk.green('✓ Expression evaluates to: true'));
    } else {
      console.log(chalk.yellow('✗ Expression evaluates to: false'));
    }
  } catch (error: any) {
    console.error(chalk.red('Error evaluating expression:'), error.message);
    process.exit(1);
  }
}

function evaluateExpression(expr: string, context: any): boolean {
  try {
    // This is a simplified evaluator
    // In production, use a proper parser for the policy expression language
    
    // Handle simple comparisons
    if (expr.includes('==')) {
      const [left, right] = expr.split('==').map(s => s.trim());
      const leftValue = getNestedProperty(context, left);
      const rightValue = right.replace(/['"]/g, '');
      return leftValue === rightValue;
    }

    if (expr.includes('!=')) {
      const [left, right] = expr.split('!=').map(s => s.trim());
      const leftValue = getNestedProperty(context, left);
      const rightValue = right.replace(/['"]/g, '');
      return leftValue !== rightValue;
    }

    if (expr.includes('>')) {
      const [left, right] = expr.split('>').map(s => s.trim());
      const leftValue = getNestedProperty(context, left);
      return Number(leftValue) > Number(right);
    }

    if (expr.includes('<')) {
      const [left, right] = expr.split('<').map(s => s.trim());
      const leftValue = getNestedProperty(context, left);
      return Number(leftValue) < Number(right);
    }

    // Handle boolean properties
    return getNestedProperty(context, expr) === true;
  } catch (error) {
    return false;
  }
}

function getNestedProperty(obj: any, path: string): any {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}
