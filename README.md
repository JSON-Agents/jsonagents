# JSON Agents

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![License](https://img.shields.io/badge/license-Apache%202.0-green.svg)](./LICENSE)
[![JSON Schema](https://img.shields.io/badge/JSON%20Schema-2020--12-purple.svg)](https://json-schema.org/draft/2020-12/json-schema-core.html)
[![Standard](https://img.shields.io/badge/standard-RFC%208259-orange.svg)](https://datatracker.ietf.org/doc/html/rfc8259)
[![Media Type](https://img.shields.io/badge/media%20type-application%2Fagents%2Bjson-teal.svg)](#)
[![Status](https://img.shields.io/badge/status-draft-yellow.svg)](./json-agents.md)

[![CLI](https://img.shields.io/badge/CLI-9%20commands-brightgreen.svg)](./packages/cli/)
[![Python Validator](https://img.shields.io/badge/Python-100%25%20coverage-success.svg)](./validators/python/)
[![TypeScript Validator](https://img.shields.io/badge/TypeScript-100%25%20coverage-success.svg)](./validators/typescript/)

> **A Universal JSON Specification for AI Agents**

---

> [!WARNING]
> **Draft Specification - Work in Progress**
> 
> This specification is currently in **draft status** and under active development. While the v1.0.0 release represents a complete and functional specification, it has not yet been formally adopted by any standards body or reached community consensus.
> 
> - The specification may change based on community feedback and implementation experience
> - Breaking changes are possible before final standardization
> - Early implementers should expect potential revisions
> - Contributions, feedback, and discussion are welcomed and encouraged
> 
> See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to participate in the specification's development.

---

### 🌐 Overview

**JSON Agents** defines an open, JSON-native specification for describing AI agents, their capabilities, tools, runtimes, and governance in a single portable manifest called the **Portable Agent Manifest (PAM)**.

It enables frameworks, SDKs, and orchestrators to **interoperate seamlessly** — sharing agent definitions that are:
- **Human-readable**: Clear JSON structure with comprehensive documentation
- **Machine-validated**: Enforced through JSON Schema 2020-12
- **Framework-agnostic**: Works with LangChain, OpenAI, AutoGen, MCP, and more
- **Future-proof**: Extensible design with `x-*` namespaces and formal extension system

JSON Agents is based entirely on established JSON standards (RFC 8259, ECMA-404, ISO 21778) and includes formal specifications for URI schemes and policy expressions.

---

### 🧩 Core Principles

| Principle | Description |
|------------|--------------|
| **JSON-Native** | Derived from RFC 8259, ECMA-404, and ISO 21778. |
| **Schema-Validated** | Enforced through JSON Schema 2020-12. |
| **Profile-Based** | Modular profiles for `core`, `exec`, `gov`, and `graph`. |
| **Governance-Aware** | Security, policies, and observability included by design. |
| **Extensible** | `extensions` and `x-*` namespaces for safe innovation. |
| **Framework-Neutral** | Compatible with any agent runtime or framework. |
| **Formally Specified** | Complete URI scheme (`ajson://`) and policy expression language definitions. |

---

### ✨ Key Features

- **🎯 7 Standard Capabilities**: Summarization, routing, retrieval, QA, classification, extraction, and generation — all with formal schemas
- **�️ Comprehensive CLI**: Full-featured command-line tool with 9 commands, 8 templates, validation, and conversion
- **✅ Production Validators**: Python and TypeScript validators with 100% test coverage
- **�🔗 URI Scheme**: Formal `ajson://` URI scheme with resolution mechanism and registry architecture
- **📜 Policy Language**: Complete expression language for declarative access control and governance
- **🔄 Framework Mappings**: Direct conversion paths for LangChain, OpenAI, AutoGen, MCP, and others
- **🌐 Multi-Agent Graphs**: Define orchestration topologies with conditional routing
- **🔒 Security First**: Built-in sandboxing, policies, and cryptographic signature support
- **📊 Observability**: Structured logging, metrics, and distributed tracing integration

---

### 📘 Specification

- **Main Specification:** [`standard/json-agents.md`](./standard/json-agents.md) — Complete PAM specification (888 lines)
- **Draft Format:** [`standard/draft-jsonagents-spec-00.md`](./standard/draft-jsonagents-spec-00.md) — IETF-style draft
- **Canonical Schema:** [`standard/schema/json-agents.json`](./standard/schema/json-agents.json) — JSON Schema 2020-12 validator

**Key Sections:**
- Section 16: [URI Scheme Definition](./standard/json-agents.md#16-uri-scheme-definition) — `ajson://` syntax and resolution
- Appendix B: [Policy Expression Language](./standard/json-agents.md#appendix-b-policy-expression-language) — Grammar and operators

---

### 📂 Repository Layout

This is a **Turborepo monorepo** with the following structure:

```bash
/
├── README.md                      # This file
├── CHANGELOG.md                   # Version history
├── CLOUDFLARE_DEPLOYMENT.md       # Deployment guide
├── turbo.json                     # Turborepo configuration
├── package.json                   # Monorepo root
│
├── apps/
│   └── website/                   # Next.js documentation site
│       ├── app/                   # Next.js 14 app directory
│       ├── components/            # React components
│       ├── public/                # Static assets
│       └── wrangler.toml          # Cloudflare Pages config
│
├── packages/
├── packages/
│   ├── cli/                       # Comprehensive CLI tool
│   │   ├── src/
│   │   │   ├── cli.ts             # Commander-based entry
│   │   │   ├── commands/          # 9 CLI commands
│   │   │   ├── templates/         # 8 agent templates
│   │   │   └── utils/             # Validation utilities
│   │   └── package.json           # @jsonagents/cli
│   ├── eslint-config/             # Shared ESLint configurations
│   └── typescript-config/         # Shared TypeScript configurations
│
└── validators/                    # Official validators
    ├── python/                    # Python validator ✅
    │   ├── jsonagents/            # Package source
    │   │   ├── validator.py       # Core validation logic
    │   │   ├── policy.py          # Policy expression parser
    │   │   ├── uri.py             # URI scheme validator
    │   │   └── cli.py             # Command-line interface
    │   ├── tests/                 # Test suite (100% coverage)
    │   └── pyproject.toml         # Python project config
    │
    └── typescript/                # TypeScript validator ✅
        ├── src/
        │   ├── validator.ts       # Core validation logic
        │   ├── policy.ts          # Policy expression parser
        │   ├── uri.ts             # URI scheme validator
        │   └── cli.ts             # Command-line interface
        ├── tests/                 # Jest test suite (100% coverage)
        └── package.json           # NPM package config
```

---

### 🛠️ Tooling & Development

**Official CLI Tool:**

The `@jsonagents/cli` provides comprehensive tooling for working with JSON Agents:

```bash
# Install globally
npm install -g @jsonagents/cli

# Or use with npx
npx @jsonagents/cli --help
```

**Available Commands:**

| Command | Description | Example |
|---------|-------------|---------|
| `init` | Create new manifest interactively | `jsonagents init --template qa` |
| `validate` | Validate manifests with watch mode | `jsonagents validate manifest.json --watch` |
| `convert` | Convert JSON ↔ YAML | `jsonagents convert manifest.json -f yaml` |
| `format` | Pretty-print or minify | `jsonagents format manifest.json --minify` |
| `info` | Display manifest details | `jsonagents info manifest.json` |
| `search` | Search agent registries | `jsonagents search "question answering"` |
| `fetch` | Download from registry | `jsonagents fetch ajson://example.com/agent` |
| `test-policy` | Test policy expressions | `jsonagents test-policy "user.role == 'admin'"` |
| `test-uri` | Validate URI format | `jsonagents test-uri ajson://example.com/agent` |

**8 Built-in Templates:**
- `router` - Request routing and delegation
- `qa` - Question answering
- `summarization` - Text summarization  
- `generation` - Content generation
- `retrieval` - Information retrieval
- `classification` - Text classification
- `extraction` - Information extraction
- `custom` - Blank template

See [`packages/cli/README.md`](packages/cli/README.md) for full documentation.

---

### 🧪 Validators

**Official validators ensure manifests comply with the specification:**

| Language | Status | Version | Test Coverage | Location |
|----------|--------|---------|---------------|----------|
| **Python** | ✅ Production Ready | v1.0.0 | 100% | [`validators/python/`](validators/python/) |
| **TypeScript** | ✅ Production Ready | v1.0.0 | 100% | [`validators/typescript/`](validators/typescript/) |
| Rust | 🔜 Coming Soon | - | - | - |
| Go | 🔜 Coming Soon | - | - | - |

**Python Validator:**
```bash
cd validators/python/
pip install -r requirements.txt

# Validate manifest
python -m jsonagents.cli validate manifest.json

# Test policy expression
python -m jsonagents.cli test-policy "user.role == 'admin'" --context '{"user":{"role":"admin"}}'

# Validate URI
python -m jsonagents.cli test-uri ajson://example.com/agent
```

**TypeScript Validator:**
```bash
cd validators/typescript/
npm install

# Validate manifest
npx ts-node src/cli.ts validate manifest.json

# Test policy expression  
npx ts-node src/cli.ts test-policy "user.role == 'admin'" --context '{"user":{"role":"admin"}}'

# Validate URI
npx ts-node src/cli.ts test-uri ajson://example.com/agent
```

**Features:**
- ✅ JSON Schema 2020-12 validation
- ✅ URI scheme validation (`ajson://`)
- ✅ Policy expression parsing and evaluation
- ✅ CLI with verbose error reporting
- ✅ 100% test coverage

See [`validators/README.md`](validators/README.md) for details.

---

### 🔗 Specification Family

JSON Agents uses a **modular profile system** for progressive enhancement:

| Profile | Required | Description | Use Case |
|---------|----------|-------------|----------|
| **Core** | ✅ Yes | Agent identity, tools, capabilities, and context | All manifests |
| **Exec** | ❌ No | Runtime metadata, language, entrypoint, resources | Deployable agents |
| **Gov** | ❌ No | Security, policies, observability, audit trails | Enterprise/regulated |
| **Graph** | ❌ No | Multi-agent topology and message routing | Orchestration |

Each profile is independently implementable, allowing minimal or full-featured agents.

---

### 🚀 Quick Start

**1. Install the CLI:**
```bash
npm install -g @jsonagents/cli
```

**2. Create your first agent:**
```bash
# Interactive mode with prompts
jsonagents init

# Or use a template
jsonagents init --template qa --name "Support Bot" --profiles core,exec
```

**3. Validate your manifest:**
```bash
jsonagents validate manifest.json --verbose

# Watch for changes
jsonagents validate manifest.json --watch
```

**4. Convert formats:**
```bash
jsonagents convert manifest.json -f yaml
jsonagents format manifest.json --indent 4
```

**5. Test components:**
```bash
# Test policy expressions
jsonagents test-policy "user.role == 'admin'" -c '{"user":{"role":"admin"}}'

# Validate URIs
jsonagents test-uri ajson://example.com/agents/my-agent
```

---

### 📝 Example Manifest

A minimal agent with all four profiles:

```json
{
  "manifest_version": "1.0",
  "profiles": ["core", "exec", "gov", "graph"],
  "agent": {
    "id": "ajson://example.com/agents/router-hub",
    "name": "Router Hub",
    "version": "1.0.0"
  },
  "capabilities": [
    { "id": "routing", "description": "Route messages by intent" }
  ],
  "runtime": { 
    "type": "node", 
    "entrypoint": "dist/router.js" 
  },
  "security": { 
    "sandbox": "process" 
  },
  "policies": [
    {
      "id": "deny-external",
      "effect": "deny",
      "action": "tool.call",
      "where": "tool.endpoint !~ 'internal.corp'"
    }
  ],
  "graph": {
    "nodes": [
      { "id": "router", "ref": "ajson://example.com/agents/router-hub" },
      { "id": "faq", "ref": "ajson://example.com/agents/faq" }
    ],
    "edges": [
      { 
        "from": "router", 
        "to": "faq", 
        "condition": "message.intent == 'faq'" 
      }
    ]
  }
}
```

**See [`examples/`](./examples/) for complete working examples.**

---

### 🚀 Use Cases

- **🔄 Framework Interoperability**: Convert between LangChain, OpenAI, AutoGen, and custom frameworks
- **📦 Agent Registries**: Build discoverable catalogs of reusable agents
- **🏗️ Multi-Agent Systems**: Orchestrate complex workflows with conditional routing
- **🔐 Enterprise Governance**: Enforce security policies and audit trails
- **📊 Agent Marketplaces**: Standardized format for distributing and monetizing agents
- **🧪 Testing & Validation**: Schema-based validation for CI/CD pipelines

---

### 🛠️ Framework Support

JSON Agents provides bidirectional conversion with major frameworks:

| Framework | Import | Export | Documentation |
|-----------|--------|--------|---------------|
| **LangChain** | ✅ | ✅ | [Mapping Guide](./docs/mapping-frameworks.md#langchain) |
| **OpenAI** | ✅ | ✅ | [Mapping Guide](./docs/mapping-frameworks.md#openai) |
| **AutoGen** | ✅ | ✅ | [Mapping Guide](./docs/mapping-frameworks.md#autogen) |
| **MCP** | ✅ | ⚠️ | [Mapping Guide](./docs/mapping-frameworks.md#mcp) |
| **Hugging Face** | ⚠️ | ⚠️ | [Mapping Guide](./docs/mapping-frameworks.md#hugging-face) |
| **CrewAI** | ⚠️ | ⚠️ | [Mapping Guide](./docs/mapping-frameworks.md#crewai) |

✅ = Fully documented | ⚠️ = Partial support

---

### 📚 Documentation

| Document | Purpose |
|----------|---------|
| [**Specification**](./standard/json-agents.md) | Complete normative specification |
| [**Implementer's Guide**](./standard/docs/implementers-guide.md) | How to parse, validate, and use manifests |
| [**Framework Mappings**](./standard/docs/mapping-frameworks.md) | Convert to/from other agent formats |
| [**Extensions Guide**](./standard/docs/extensions.md) | Create custom extensions with `x-*` |
| [**Examples**](./standard/examples/) | Working manifest examples |
| [**Changelog**](./standard/CHANGELOG.md) | Version history and roadmap |

---

### 🔧 Tools & Infrastructure

**Validators:**

| Language | Status | Package | Quick Start |
|----------|--------|---------|-------------|
| **Python** | ✅ v1.0.0 | Local install | `python -m jsonagents.cli validate` |
| **TypeScript** | ✅ v1.0.0 | Local install | `npx ts-node src/cli.ts validate` |

**Infrastructure:**
- ✅ **Documentation Website** - Next.js 14 with App Router ([`apps/website/`](./apps/website/))
- ✅ **Cloudflare Pages** - Automated deployment on push ([see guide](./CLOUDFLARE_DEPLOYMENT.md))
- ✅ **CI/CD Workflows** - Automated testing and validation
- ✅ **Turborepo** - Efficient build caching and task orchestration
- ✅ **GitHub Actions** - Automated deployments and CI checks

**Deployment:**

The documentation website is configured for Cloudflare Pages deployment:

```bash
# Deploy via CLI
npm run deploy:pages

# Or configure in Cloudflare Dashboard:
# Build command: npm run build -- --filter=@json-agents/website
# Output directory: apps/website/out
```

See [`CLOUDFLARE_DEPLOYMENT.md`](./CLOUDFLARE_DEPLOYMENT.md) for complete deployment instructions.

**Development Tools:**
- Turborepo for monorepo management
- Shared ESLint and TypeScript configurations
- Prettier for code formatting
- Jest for TypeScript testing
- pytest for Python testing

---

### 💻 Development

This repository uses **Turborepo** for efficient monorepo management with multiple workspaces.

#### Install Dependencies
```bash
npm install
```

#### Development Commands
```bash
# Development
npm run dev                 # Start all apps in development mode
npm run dev:website        # Start only the documentation website

# Building
npm run build              # Build all packages
npm run build:website      # Build only the website

# Testing & Quality
npm run lint               # Lint all packages
npm run test               # Run all tests
npm run clean              # Clean build artifacts
npm run format             # Format code with Prettier

# Deployment
npm run deploy:pages       # Deploy website to Cloudflare Pages
```

#### Workspace Commands
Target specific workspaces with Turbo's filter:
```bash
# Build a specific package
turbo run build --filter=@json-agents/website

# Run tests in a specific workspace
turbo run test --filter=validators/typescript
```

#### Repository Structure
- **`apps/website/`** - Next.js 14 documentation website (App Router)
- **`packages/eslint-config/`** - Shared ESLint configurations
- **`packages/typescript-config/`** - Shared TypeScript configurations
- **`validators/python/`** - Python validator with CLI and test suite
- **`validators/typescript/`** - TypeScript validator with Jest tests

---

### 🌟 What's New in v1.0

**Recent Additions:**
- ✨ **Turborepo Architecture**: Migrated to efficient monorepo structure
- 🚀 **Cloudflare Pages Deployment**: Automated CI/CD pipeline for documentation site
- ✅ **TypeScript Validator**: Full implementation with 100% test coverage
- ✅ **Python Validator**: Enhanced with comprehensive test suite
- 📦 **Shared Tooling**: ESLint and TypeScript configurations across workspaces
- 🎨 **Next.js 14 Website**: Modern documentation site with App Router
- 🔧 **GitHub CLI Integration**: Repository management automation

**Specification Updates:**
- ✨ **URI Scheme Definition**: Formal `ajson://` specification with resolution mechanism
- 📜 **Policy Expression Language**: Complete grammar for `where` clauses
- 🎯 **Complete Capability Suite**: All 7 capabilities now have formal schemas

See [CHANGELOG.md](./CHANGELOG.md) for full details.

---

### 🤝 Community & Support

- **💬 Discussions**: [GitHub Discussions](https://github.com/Agents-Json/Standard/discussions) (coming soon)
- **🐛 Issues**: [GitHub Issues](https://github.com/Agents-Json/Standard/issues)
- **📧 Contact**: spec@agentsjson.org
- **📖 Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

### 🎯 Roadmap

**v1.0 (Current)**:
- ✅ Core, Exec, Gov, Graph profiles
- ✅ 7 capability schemas
- ✅ URI scheme specification
- ✅ Policy expression language
- ✅ Framework mapping guide
- ✅ Python & TypeScript validators (100% coverage)
- ✅ Turborepo monorepo architecture
- ✅ Documentation website with Cloudflare deployment
- ✅ CI/CD pipelines

**v1.1 (In Progress)**:
- 🔨 Standard directory integration
- 🔨 JSON Schema examples and documentation
- 🔨 Interactive JSON viewer on website
- 🔨 Framework converter tools
- 🔨 Community extensions registry

**Future**:
- Real-time profile for streaming agents
- Evaluation profile for testing/benchmarking
- Enhanced policy expression functions
- Public registry service
- Formal IETF/W3C standardization path

---

### ⚖️ License

JSON Agents is released under the **Apache 2.0 License**.
See [`LICENSE`](./LICENSE) for details.

---

### 🧭 Contributing

We welcome contributions! Whether you're:
- 🐛 Reporting bugs or issues
- 💡 Proposing new features
- 📝 Improving documentation
- 🔧 Building tools and validators
- 🌍 Creating framework integrations

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for guidelines.

**Code of Conduct**: This project follows the [Contributor Covenant 2.0](./CODE_OF_CONDUCT.md).

---

### 📊 Project Status

| Aspect | Status |
|--------|--------|
| **Specification** | 🟢 v1.0.0 Complete |
| **Schema Coverage** | 🟢 7/7 Capabilities (100%) |
| **Documentation** | 🟢 Comprehensive (Next.js site) |
| **Validators** | 🟢 Python & TypeScript (100% coverage) |
| **Infrastructure** | 🟢 Turborepo + Cloudflare Pages |
| **Tooling** | � CLI, CI/CD, Build System |
| **Community** | 🟡 Growing |
| **Standards Track** | 🟡 Draft |

---

### 🏆 Design Goals

JSON Agents is designed to be:

1. **Simple**: Easy to read and write by humans
2. **Complete**: Covers all aspects of agent definition
3. **Flexible**: Modular profiles for different use cases
4. **Safe**: Built-in security and governance
5. **Interoperable**: Works with existing frameworks
6. **Extensible**: Room for innovation without breaking changes
7. **Standard**: Based on established JSON specifications

---

### 🧱 Standards Compliance

JSON Agents is built on solid foundations:

- ✅ [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259) — JSON Data Interchange Format
- ✅ [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) — URI Generic Syntax
- ✅ [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119) — Requirement Levels
- ✅ [ECMA-404](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/) — JSON Data Interchange Syntax
- ✅ [ISO/IEC 21778:2017](https://www.iso.org/standard/71616.html) — JSON Standard
- ✅ [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core.html) — Validation

---

### 🔗 Related Projects

- [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) — Tool/context protocol
- [OpenAI Agents](https://platform.openai.com/docs/agents) — Agent API format
- [LangChain](https://github.com/langchain-ai/langchain) — Agent framework
- [AutoGen](https://github.com/microsoft/autogen) — Multi-agent framework

---

### 📈 Quick Stats

- 📄 **103 files** in initial commit
- 🎯 **2 validators** (Python & TypeScript with 100% coverage)
- 📋 **4 profiles** (core, exec, gov, graph)
- 🔧 **3 workspaces** (apps, packages, validators)
- 🌐 **17 pages** on documentation website
- � **Cloudflare Pages** deployment ready
- 📦 **Turborepo** for efficient builds

---

### 🙏 Acknowledgments

JSON Agents draws inspiration from:
- JSON Schema and JSON-LD communities
- OpenAPI and AsyncAPI specifications
- Agent framework developers (LangChain, AutoGen, CrewAI)
- Model Context Protocol contributors
- The broader open-source AI community

---

### 🧱 Versioning

Version identifiers follow [Semantic Versioning 2.0](https://semver.org/).
The default branch represents the **latest stable version** of the specification.

---

© 2025 JSON Agents. All rights reserved.
