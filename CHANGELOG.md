# Changelog  
All notable changes to the JSON Agents specification will be documented in this file.

This project adheres to [Semantic Versioning 2.0.0](https://semver.org/).

---

## [1.0.1] — 2025-11-12
**Tooling and Documentation Release**

### Added

- **Comprehensive CLI Tool** (`packages/cli/`)
  - Full-featured command-line interface with 9 commands
  - `init` - Interactive manifest generator with 8 templates
  - `validate` - Schema validation with watch mode
  - `convert` - JSON ↔ YAML conversion
  - `format` - Pretty-print and minify manifests
  - `info` - Display manifest details in tables
  - `search` - Search agent registries
  - `fetch` - Download manifests from registry
  - `test-policy` - Test policy expressions
  - `test-uri` - Validate URI format
  - 8 built-in templates (router, qa, summarization, generation, retrieval, classification, extraction, custom)
  - Interactive prompts with Inquirer
  - File watching with Chokidar
  - Commander.js framework
  - npm package `@jsonagents/cli`

- **Documentation Website** (`apps/website/`)
  - Next.js 14 documentation site with App Router
  - Cloudflare Pages deployment configured
  - Static export for edge deployment
  - GitHub Actions workflow for automated deployment
  - Comprehensive specification browser
  - Examples and quick start guides

### Changed

- **README.md** - Major update to showcase tooling
  - Added CLI, Python, and TypeScript validator badges
  - New "Tooling & Development" section with CLI command table
  - Enhanced "Quick Start" section with practical examples
  - Updated repository structure to include CLI package
  - Improved validator documentation with usage examples
  - Highlighted CLI and validators in key features

- **Turborepo Structure** - Organized as monorepo
  - Added `turbo.json` for build orchestration
  - Workspace configuration for apps and packages
  - Shared TypeScript and ESLint configurations
  - Build caching and dependency management

---

## [1.1.0] — 2025-11-11  
**Infrastructure and Tooling Release**

### Added

- **TypeScript Validator** (`validators/typescript/`)
  - Complete TypeScript/JavaScript implementation of the JSON Agents validator
  - Ajv-based JSON Schema validation engine
  - RFC 3986 compliant URI validator for ajson:// scheme
  - Policy expression parser with AST generation
  - CLI tool with colorized output and file validation
  - npm package `@jsonagents/validator` for Node.js 18+ environments
  - Comprehensive test suite with Jest (55 tests, 96.53% coverage)
  - TypeScript type definitions and full JSDoc documentation

- **CI/CD Workflows** (`.github/workflows/`)
  - Comprehensive CI pipeline for automated testing and validation
  - Schema validation job (verifies all JSON schemas are valid)
  - Manifest validation job (validates all examples against schemas)
  - Python validator tests across multiple Python versions (3.11, 3.12, 3.13)
  - Registry and documentation validation jobs
  - Release workflow for automated GitHub releases and PyPI publishing
  - Coverage reporting integration with Codecov

- **TypeScript/JavaScript Validator** (`validators/typescript/`)
  - Complete TypeScript validator package (`@jsonagents/validator`)
  - JSON Schema validation using Ajv 8.x with JSON Schema 2020-12 support
  - RFC 3986 compliant `ajson://` URI validator
  - Policy expression parser with full AST generation
  - CLI tool with multiple commands:
    - `validate` - Validate manifests with profile checking
    - `validate-uri` - Validate ajson:// URIs
    - `validate-policy` - Validate policy expressions
    - `info` - Display manifest information
    - `format` - Format and pretty-print manifests
  - Comprehensive test suite (29 tests) with Jest
  - Full TypeScript type definitions
  - ESLint and Prettier configuration
  - Successfully validates all example manifests

- **Python Validator Integration** (`validators/python/`)
  - Moved Python validator into monorepo structure
  - Updated paths for monorepo compatibility
  - All 47 tests passing with 82% coverage
  - Integration tests (4/4 passing)
  - Complete documentation suite

- **Documentation Updates**
  - Updated README.md with validator comparison table
  - Enhanced validators/README.md with TypeScript validator details
  - Added CI/CD status badges
  - Quick start guides for both validators

### Changed
- Python validator now uses relative paths (`../../examples`) for monorepo structure
- Build configuration updated for automated testing

### Notes
This release establishes automated quality assurance and provides validators for both Python and JavaScript ecosystems. All validators are production-ready and fully tested.

---

## [1.0.0] — 2025-11-10  
**Initial Publication**

### Added
- **JSON Agents Specification (`json-agents.md`)**  
  - Defines the **Portable Agent Manifest (PAM)** model.  
  - Includes normative structure for `core`, `exec`, `gov`, and `graph` profiles.  
  - Provides formal terminology, examples, and conformance sections.

- **Canonical JSON Schema (`schema/json-agents.json`)**  
  - Implements validation for all core fields and conditional profile requirements.  
  - Supports `extensions` and `x-*` namespaces.  
  - Ensures JSON Schema 2020-12 compatibility.

- **Repository Layout and Supporting Files**  
  - `README.md` with overview and quick reference.  
  - `LICENSE` under Apache 2.0.  
  - `CONTRIBUTING.md` for guidelines and validation workflow.  
  - `CODE_OF_CONDUCT.md` with Contributor Covenant 2.0.
  - Directory structure for `/schema`, `/examples`, `/registry`, `/docs`.

- **Extension System**
  - Extension registry (`registry/extensions.json`) with 4 registered extensions.
  - Schema definitions for `x-audit` and `x-memory` extensions.
  - Comprehensive extensions guide (`docs/extensions.md`).

- **Profile Registry**
  - Formal profile definitions (`registry/profiles.json`).
  - Documentation for extending with custom profiles.

- **Capability and Tool Registries**
  - Capabilities registry with 7 standard capabilities.
  - Tool types registry with 6 recognized types.
  - Schema definitions for summarization, routing, retrieval, qa, classification, extraction, and generation capabilities.

- **URI Scheme Definition (Section 16)**  
  - Formal specification of `ajson://` URI scheme syntax (RFC 3986 compliant).
  - Resolution mechanism with HTTPS transformation and well-known URI pattern.
  - Registry service requirements and API guidelines.
  - Comprehensive security considerations for URI resolution.
  - IANA registration considerations for URI scheme.

- **Policy Expression Language (Appendix B)**  
  - Formal grammar definition for policy `where` clauses.
  - Complete operator specification (comparison, string, collection, logical).
  - Operator precedence rules and evaluation semantics.
  - Context variable documentation.
  - Security and performance implementation guidance.
  - Examples for common policy patterns.

- **Interoperability Mappings**
  - Framework mapping guide (`docs/mapping-frameworks.md`).
  - Conversion patterns for LangChain, OpenAI, AutoGen, MCP, and others.
  - YAML ↔ JSON interoperability guidance.

- **IANA Considerations**
  - Media type: `application/agents+json`.
  - File extension: `.agents.json`.
  - Content negotiation guidelines.

### Notes
This release defines the foundation for all subsequent versions.  
Backward compatibility will be preserved whenever feasible.

---

## Versioning Policy

- **Patch** — editorial, clarification, or non-breaking corrections.  
- **Minor** — new optional fields or example additions.  
- **Major** — breaking schema or terminology changes.

---

**© 2025 JSON Agents. All rights reserved.**
