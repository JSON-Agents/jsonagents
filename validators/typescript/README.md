# JSON Agents TypeScript Validator

A comprehensive TypeScript/JavaScript validator for [JSON Agents](https://github.com/Agents-Json/Standard) Portable Agent Manifests (PAM).

## Features

- ✅ **JSON Schema Validation**: Validates manifests against JSON Schema 2020-12
- 🔗 **URI Validation**: Complete `ajson://` URI scheme validator with RFC 3986 compliance
- 📜 **Policy Validation**: Policy expression parser and validator
- 🎯 **Profile Checking**: Verify manifests conform to specific profiles
- 🛠️ **CLI Tool**: Command-line interface for validation and inspection
- 📦 **TypeScript Support**: Full TypeScript types and declarations
- 🧪 **Well Tested**: Comprehensive test suite with Jest

## Installation

```bash
npm install @jsonagents/validator
```

Or with yarn:

```bash
yarn add @jsonagents/validator
```

## CLI Usage

The package includes a `jsonagents` CLI tool:

### Validate a Manifest

```bash
npx jsonagents validate manifest.json
```

With verbose output:

```bash
npx jsonagents validate manifest.json --verbose
```

Check for specific profiles:

```bash
npx jsonagents validate manifest.json --profiles core exec
```

### Validate a URI

```bash
npx jsonagents validate-uri ajson://example.com/agents/my-agent
```

### Validate a Policy Expression

```bash
npx jsonagents validate-policy 'user.role == "admin" && user.active'
```

### Display Manifest Information

```bash
npx jsonagents info manifest.json
```

### Format a Manifest

```bash
npx jsonagents format manifest.json -o formatted.json
```

## Programmatic Usage

### Validate a Manifest

```typescript
import { JsonAgentsValidator } from '@jsonagents/validator';

const validator = new JsonAgentsValidator();
const result = validator.validateFile('manifest.json');

if (result.valid) {
  console.log('✓ Manifest is valid');
} else {
  console.error('✗ Validation errors:', result.message);
}
```

### Validate from Object

```typescript
import { JsonAgentsValidator } from '@jsonagents/validator';

const manifest = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  name: 'my-agent',
  version: '1.0.0',
  profiles: ['core'],
  capabilities: [],
  tools: []
};

const validator = new JsonAgentsValidator();
const result = validator.validate(manifest);
```

### Get Detailed Information

```typescript
const validator = new JsonAgentsValidator();
const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf-8'));

const info = validator.getValidationInfo(manifest);

console.log(`Profiles: ${info.profiles.join(', ')}`);
console.log(`Capabilities: ${info.capabilities}`);
console.log(`Tools: ${info.tools}`);
console.log(`Extensions: ${info.extensions.join(', ')}`);
```

### Validate URI

```typescript
import { validateAjsonUri, validateAndParseAjsonUri } from '@jsonagents/validator';

// Basic validation
const result = validateAjsonUri('ajson://example.com/agents/my-agent');
console.log(result.valid); // true
console.log(result.httpsUrl); // https://example.com/.well-known/json-agents/agents/my-agent

// Parse and validate
const parsed = validateAndParseAjsonUri('ajson://example.com/agents/my-agent');
console.log(parsed.domain); // example.com
console.log(parsed.namespace); // agents
console.log(parsed.identifier); // my-agent
```

### Validate Policy Expression

```typescript
import { validatePolicy, parsePolicy } from '@jsonagents/validator';

// Validate expression
const result = validatePolicy('user.role == "admin" && user.active');
console.log(result.valid); // true

// Parse into AST
const parsed = parsePolicy('user.role == "admin"');
console.log(parsed.ast);
// {
//   type: 'binary',
//   operator: '==',
//   left: { type: 'variable', name: 'user.role' },
//   right: { type: 'literal', value: 'admin' }
// }
```

## API Reference

### JsonAgentsValidator

#### `constructor(options?: ValidationOptions)`

Create a new validator instance.

**Options:**
- `strict` (boolean): Enable strict schema validation (default: true)
- `allErrors` (boolean): Collect all validation errors (default: true)
- `verbose` (boolean): Include verbose error information (default: false)

#### `validate(manifest: any): ValidationResult`

Validate a manifest object.

**Returns:**
- `valid` (boolean): Whether the manifest is valid
- `errors` (ErrorObject[]): Array of validation errors (if any)
- `message` (string): Formatted error message (if validation failed)

#### `validateFile(filePath: string): ValidationResult`

Validate a manifest from a file.

#### `getValidationInfo(manifest: any): ValidationInfo`

Get detailed information about a manifest.

**Returns:**
- `valid` (boolean): Whether the manifest is valid
- `profiles` (string[]): List of profiles
- `capabilities` (number): Number of capabilities
- `tools` (number): Number of tools
- `extensions` (string[]): List of extension names
- `errors` (ErrorObject[]): Validation errors (if any)

#### `checkProfiles(manifest: any, requiredProfiles: string[]): ValidationResult`

Check if a manifest includes required profiles.

### URI Functions

#### `validateAjsonUri(uri: string): UriValidationResult`

Validate an `ajson://` URI.

#### `validateAndParseAjsonUri(uri: string): ParsedUriResult`

Validate and parse an `ajson://` URI into components.

#### `extractNamespaceAndId(path: string): { namespace: string; identifier: string } | null`

Extract namespace and identifier from a URI path.

### Policy Functions

#### `validatePolicy(expression: string): PolicyParseResult`

Validate a policy expression.

#### `parsePolicy(expression: string): PolicyParseResult`

Parse a policy expression into an Abstract Syntax Tree (AST).

#### `checkPolicyOperators(expression: string): { valid: boolean; unsupportedOperators?: string[] }`

Check if a policy uses only supported operators.

## Development

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

With coverage:

```bash
npm run test:coverage
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

## License

Apache-2.0 - See [LICENSE](../../LICENSE) for details.

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for contribution guidelines.

## Links

- [JSON Agents Specification](../../json-agents.md)
- [GitHub Repository](https://github.com/Agents-Json/Standard)
- [Issue Tracker](https://github.com/Agents-Json/Standard/issues)
