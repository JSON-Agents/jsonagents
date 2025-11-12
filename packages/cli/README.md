# @jsonagents/cli

> Comprehensive CLI tool for JSON Agents

A full-featured command-line interface for working with JSON Agents manifests, including validation, generation, conversion, and management.

## Features

- ✅ **Validation** - Schema, URI, and policy expression validation
- 🎨 **Generation** - Create manifests from templates with prompts
- 🔄 **Conversion** - Convert between JSON and YAML formats
- 📊 **Information** - Display manifest details in tables
- 🎯 **Templates** - 8 pre-built templates for common agent types
- 🔍 **Search** - Discover agents in registries
- 📥 **Fetch** - Download manifests from registries
- 🎨 **Format** - Pretty-print and minify manifests
- 👁️ **Watch Mode** - Auto-validate on file changes

## Installation

```bash
npm install -g @jsonagents/cli
```

## Usage

### Initialize a new manifest

```bash
# Interactive prompts
jsonagents init

# From template
jsonagents init --template router --name "My Router"

# With specific profiles
jsonagents init --template qa --profiles core,exec
```

#### Validate manifests

```bash
# Validate a single file
jsonagents validate manifest.json

# Validate with verbose output
jsonagents validate manifest.json --verbose

# Validate all JSON files in a directory
jsonagents validate ./agents/**/*.json

# Watch mode (auto-validate on changes)
jsonagents validate manifest.json --watch
```

#### Convert formats

```bash
# JSON to YAML
jsonagents convert manifest.json --output manifest.yaml

# YAML to JSON
jsonagents convert manifest.yaml --format json

# Pretty print with custom indent
jsonagents format manifest.json --indent 4

# Minify
jsonagents format manifest.json --minify
```

#### Get information

```bash
# Display manifest details
jsonagents info manifest.json

# Show in table format
jsonagents info manifest.json --format table

# Show dependencies
jsonagents info manifest.json --show-deps

# List components
jsonagents list capabilities manifest.json
jsonagents list tools manifest.json
jsonagents list profiles manifest.json
```

#### Registry operations

```bash
# Search for agents
jsonagents search routing
jsonagents search --category summarization --profile core

# Fetch agent manifest
jsonagents fetch ajson://example.com/agents/router
jsonagents fetch ajson://example.com/agents/router --output router.json

# Publish to registry (requires authentication)
jsonagents publish manifest.json --uri ajson://myorg.com/agents/my-agent
```

#### Testing and debugging

```bash
# Test policy expressions
jsonagents test-policy 'user.role == "admin"' --context '{"user":{"role":"admin"}}'

# Validate URI format
jsonagents test-uri ajson://example.com/agents/router

# Simulate agent execution
jsonagents simulate manifest.json --input input.json
```

## Templates

Built-in templates for common agent types:

- **router** - Multi-agent routing hub
- **qa** - Question answering agent
- **summarization** - Document summarizer
- **generation** - Content generation agent
- **retrieval** - Information retrieval agent
- **classification** - Classification agent
- **extraction** - Entity extraction agent
- **custom** - Blank template

## Configuration

Create a `.jsonagentsrc` or `jsonagents.config.js` file:

```json
{
  "registry": "https://registry.jsonagents.org",
  "defaultProfiles": ["core"],
  "templates": "./templates/",
  "outputFormat": "json",
  "indent": 2,
  "strictValidation": true
}
```

## Examples

### Create a routing agent interactively

```bash
$ jsonagents init

? What type of agent? Router Agent
? Agent name: My Router Agent
? Profiles: core, exec
? Add capabilities? Yes
? Capability type: routing

✓ Created manifest.json
✓ Validated successfully
```

### Convert and validate

```bash
# Convert YAML to JSON and validate
jsonagents convert agent.yaml -o agent.json
jsonagents validate agent.json --verbose
```

### Search and fetch

```bash
# Find routing agents
jsonagents search routing

# Fetch a specific agent
jsonagents fetch ajson://jsonagents.org/examples/router-hub
```

## TUI Features

The interactive TUI provides:

- **Visual Editor** - Edit manifests with a guided interface
- **Real-time Validation** - See validation errors as you type
- **Template Browser** - Browse and select from templates
- **Component Manager** - Add/remove capabilities, tools, and profiles
- **Dependency Viewer** - Visualize agent dependencies
- **Schema Browser** - Explore the JSON Agents schema
- **Quick Actions** - Common operations with keyboard shortcuts

### Keyboard Shortcuts

- `↑/↓` - Navigate
- `Enter` - Select
- `Tab` - Next field
- `Esc` - Go back
- `Ctrl+S` - Save
- `Ctrl+Q` - Quit
- `Ctrl+V` - Validate
- `Ctrl+H` - Help

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint
```

## License

Apache-2.0
