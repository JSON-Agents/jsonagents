/**
 * Policy Expression Parser and Validator
 * 
 * Parses and validates policy expressions according to the JSON Agents specification.
 */

export interface PolicyParseResult {
  valid: boolean;
  message?: string;
  ast?: PolicyExpression;
}

export type PolicyExpression =
  | { type: 'literal'; value: string | number | boolean }
  | { type: 'variable'; name: string }
  | { type: 'binary'; operator: string; left: PolicyExpression; right: PolicyExpression }
  | { type: 'unary'; operator: string; operand: PolicyExpression }
  | { type: 'function'; name: string; args: PolicyExpression[] };

// Supported operators
const BINARY_OPERATORS = ['==', '!=', '<', '<=', '>', '>=', '&&', '||', '+', '-', '*', '/', '%', '~=', '!~'];
const UNARY_OPERATORS = ['!', '-'];
const FUNCTIONS = ['startsWith', 'endsWith', 'contains', 'matches', 'length', 'upper', 'lower'];

/**
 * Parse a policy expression
 */
export function parsePolicy(expression: string): PolicyParseResult {
  if (!expression || expression.trim().length === 0) {
    return {
      valid: false,
      message: 'Policy expression cannot be empty',
    };
  }

  try {
    const tokens = tokenize(expression);
    const ast = parse(tokens);
    
    return {
      valid: true,
      ast,
    };
  } catch (error) {
    return {
      valid: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Tokenize the policy expression
 */
function tokenize(expression: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    // Handle strings
    if ((char === '"' || char === "'") && !inString) {
      if (current) {
        tokens.push(current);
        current = '';
      }
      inString = true;
      stringChar = char;
      current = char;
      continue;
    }

    if (char === stringChar && inString) {
      current += char;
      tokens.push(current);
      current = '';
      inString = false;
      stringChar = '';
      continue;
    }

    if (inString) {
      current += char;
      continue;
    }

    // Handle operators and delimiters
    if (char === ' ' || char === '\t' || char === '\n') {
      if (current) {
        tokens.push(current);
        current = '';
      }
      continue;
    }

    // Handle multi-character operators
    if (i < expression.length - 1) {
      const twoChar = char + expression[i + 1];
      if (BINARY_OPERATORS.includes(twoChar)) {
        if (current) {
          tokens.push(current);
          current = '';
        }
        tokens.push(twoChar);
        i++;
        continue;
      }
    }

    // Handle single-character operators and delimiters (but not dots in identifiers)
    if ('(),'.includes(char) || BINARY_OPERATORS.includes(char) || UNARY_OPERATORS.includes(char)) {
      if (current) {
        tokens.push(current);
        current = '';
      }
      tokens.push(char);
      continue;
    }

    current += char;
  }

  if (current) {
    tokens.push(current);
  }

  return tokens;
}

/**
 * Parse tokens into an AST
 */
function parse(tokens: string[]): PolicyExpression {
  let position = 0;

  function peek(): string | undefined {
    return tokens[position];
  }

  function consume(): string {
    return tokens[position++];
  }

  function parseExpression(): PolicyExpression {
    return parseLogicalOr();
  }

  function parseLogicalOr(): PolicyExpression {
    let left = parseLogicalAnd();

    while (peek() === '||') {
      const operator = consume();
      const right = parseLogicalAnd();
      left = { type: 'binary', operator, left, right };
    }

    return left;
  }

  function parseLogicalAnd(): PolicyExpression {
    let left = parseComparison();

    while (peek() === '&&') {
      const operator = consume();
      const right = parseComparison();
      left = { type: 'binary', operator, left, right };
    }

    return left;
  }

  function parseComparison(): PolicyExpression {
    let left = parseAdditive();

    while (peek() && ['==', '!=', '<', '<=', '>', '>=', '~=', '!~'].includes(peek()!)) {
      const operator = consume();
      const right = parseAdditive();
      left = { type: 'binary', operator, left, right };
    }

    return left;
  }

  function parseAdditive(): PolicyExpression {
    let left = parseMultiplicative();

    while (peek() === '+' || peek() === '-') {
      const operator = consume();
      const right = parseMultiplicative();
      left = { type: 'binary', operator, left, right };
    }

    return left;
  }

  function parseMultiplicative(): PolicyExpression {
    let left = parseUnary();

    while (peek() === '*' || peek() === '/' || peek() === '%') {
      const operator = consume();
      const right = parseUnary();
      left = { type: 'binary', operator, left, right };
    }

    return left;
  }

  function parseUnary(): PolicyExpression {
    if (peek() === '!' || peek() === '-') {
      const operator = consume();
      
      // Special case: check if this is != or !~ (should not reach here)
      if (operator === '!' && peek() && ['=', '~'].includes(peek()![0])) {
        throw new Error(`Unexpected operator: ${operator}${peek()}`);
      }
      
      const operand = parseUnary();
      return { type: 'unary', operator, operand };
    }

    return parsePrimary();
  }

  function parsePrimary(): PolicyExpression {
    const token = peek();

    if (!token) {
      throw new Error('Unexpected end of expression');
    }

    // Parentheses
    if (token === '(') {
      consume();
      const expr = parseExpression();
      if (consume() !== ')') {
        throw new Error('Expected closing parenthesis');
      }
      return expr;
    }

    // String literal
    if (token.startsWith('"') || token.startsWith("'")) {
      consume();
      return { type: 'literal', value: token.slice(1, -1) };
    }

    // Number literal
    if (/^-?\d+(\.\d+)?$/.test(token)) {
      consume();
      return { type: 'literal', value: parseFloat(token) };
    }

    // Boolean literal
    if (token === 'true' || token === 'false') {
      consume();
      return { type: 'literal', value: token === 'true' };
    }

    // Function call - check if next token is '('
    const nextToken = position < tokens.length - 1 ? tokens[position + 1] : undefined;
    if (FUNCTIONS.includes(token) && nextToken === '(') {
      const name = consume();
      consume(); // (
      const args: PolicyExpression[] = [];

      if (peek() !== ')') {
        args.push(parseExpression());
        while (peek() === ',') {
          consume();
          args.push(parseExpression());
        }
      }

      if (consume() !== ')') {
        throw new Error('Expected closing parenthesis for function call');
      }

      return { type: 'function', name, args };
    }

    // Variable
    if (/^[a-zA-Z_][a-zA-Z0-9_\.]*$/.test(token)) {
      consume();
      return { type: 'variable', name: token };
    }

    throw new Error(`Unexpected token: ${token}`);
  }

  const ast = parseExpression();

  if (position < tokens.length) {
    throw new Error(`Unexpected token after expression: ${tokens[position]}`);
  }

  return ast;
}

/**
 * Validate a policy expression
 */
export function validatePolicy(expression: string): PolicyParseResult {
  return parsePolicy(expression);
}

/**
 * Check if a policy uses only allowed operators
 */
export function checkPolicyOperators(expression: string): {
  valid: boolean;
  unsupportedOperators?: string[];
} {
  const tokens = tokenize(expression);
  const operators = tokens.filter(t => 
    BINARY_OPERATORS.includes(t) || UNARY_OPERATORS.includes(t)
  );

  const unsupported = operators.filter(op => 
    !BINARY_OPERATORS.includes(op) && !UNARY_OPERATORS.includes(op)
  );

  if (unsupported.length > 0) {
    return {
      valid: false,
      unsupportedOperators: unsupported,
    };
  }

  return { valid: true };
}

export default {
  parsePolicy,
  validatePolicy,
  checkPolicyOperators,
};
