"use client";

import { Github, CheckCircle, Code } from "lucide-react";

export default function ValidatorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-slate-900">
        <div className="w-full max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <a href="/" className="text-white text-2xl font-bold">
            JSON Agents
          </a>
          <div className="flex space-x-8">
            <a href="/getting-started" className="text-white hover:text-gray-200 text-base font-medium">Getting Started</a>
            <a href="/schema" className="text-white hover:text-gray-200 text-base font-medium">Schema</a>
            <a href="/docs" className="text-white hover:text-gray-200 text-base font-medium">Docs</a>
            <a href="https://github.com/JSON-AGENTS/Standard" className="text-white hover:text-gray-200 flex items-center gap-2" aria-label="GitHub">
              <Github size={24} strokeWidth={2} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-slate-900 py-16">
        <div className="w-full max-w-4xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-6">
            <CheckCircle size={48} className="text-white" strokeWidth={2} />
            <h1 className="text-5xl font-bold text-white">Validators</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Production-ready validators for Python and TypeScript. Validate JSON Agents manifests, policy expressions, and ajson:// URIs.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="w-full max-w-4xl mx-auto px-8">
          
          {/* Installation */}
                  <div className="max-w-4xl mx-auto">
          {/* Installation */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Installation</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Python</h3>
            <div className="bg-slate-900 text-white p-6 rounded-lg font-mono text-sm mb-6">
              <div className="mb-2"># Install via pip (coming soon)</div>
              <div className="text-gray-400">Coming soon.</div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">TypeScript/JavaScript</h3>
            <div className="bg-slate-900 text-white p-6 rounded-lg font-mono text-sm mb-4">
              <div className="mb-2"># Install via npm (coming soon)</div>
              <div className="text-gray-400">Coming soon.</div>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              📦 Package publishing coming soon. For now, install from source in <code className="bg-gray-100 px-2 py-1 rounded">validators/python</code> or <code className="bg-gray-100 px-2 py-1 rounded">validators/typescript</code>
            </p>
          </div>

          {/* Quick Start */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Start</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Python Validator</h3>
            <div className="bg-slate-900 text-white p-6 rounded-lg font-mono text-sm mb-6">
              <div className="text-gray-400 mb-1">from jsonagents import validate</div>
              <div className="text-gray-400 mb-1"></div>
              <div className="text-gray-400 mb-1">agent_data = {"{'}'}</div>
              <div className="text-gray-400 mb-1">    "name": "MyAgent",</div>
              <div className="text-gray-400 mb-1">    "version": "1.0.0",</div>
              <div className="text-gray-400 mb-1">    "capabilities": ["action", "query"]</div>
              <div className="text-gray-400 mb-1">{'}'}</div>
              <div className="text-gray-400 mb-1"></div>
              <div className="text-gray-400 mb-1">result = validate(agent_data)</div>
              <div className="text-gray-400">print(result.valid)</div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">TypeScript Validator</h3>
            <div className="bg-slate-900 text-white p-6 rounded-lg font-mono text-sm mb-6">
              <div className="text-gray-400 mb-1">import {'{'} validate {'}'} from '@jsonagents/validator';</div>
              <div className="text-gray-400 mb-1"></div>
              <div className="text-gray-400 mb-1">const agentData = {'{'}</div>
              <div className="text-gray-400 mb-1">  name: "MyAgent",</div>
              <div className="text-gray-400 mb-1">  version: "1.0.0",</div>
              <div className="text-gray-400 mb-1">  capabilities: ["action", "query"]</div>
              <div className="text-gray-400 mb-1">{'}'};</div>
              <div className="text-gray-400 mb-1"></div>
              <div className="text-gray-400 mb-1">const result = validate(agentData);</div>
              <div className="text-gray-400">console.log(result.valid);</div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Schema Validation</h3>
                <p className="text-gray-600">Comprehensive validation against JSON Agents specification</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Policy Enforcement</h3>
                <p className="text-gray-600">Validate agent policies and security constraints</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">URI Validation</h3>
                <p className="text-gray-600">Validate JSON Agents URI scheme compliance</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Error Reports</h3>
                <p className="text-gray-600">Clear error messages with field-level validation details</p>
              </div>
            </div>
          </div>

          {/* Available Validators */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Validators</h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Python Validator</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Full-featured Python implementation with CLI support and comprehensive testing
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Schema validation with jsonschema library</li>
                  <li>Policy language validation and evaluation</li>
                  <li>URI scheme validation and parsing</li>
                  <li>Command-line interface for batch validation</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900">TypeScript Validator</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Type-safe TypeScript implementation for Node.js and browser environments
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Type definitions for full IDE support</li>
                  <li>AJV-based schema validation</li>
                  <li>Policy expression evaluation</li>
                  <li>Works in Node.js and modern browsers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Commands */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Commands</h2>
            
            <div className="space-y-8">
              {/* Init */}
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">init</h3>
                <p className="text-gray-700 mb-3">Create a new JSON Agents manifest interactively</p>
                <div className="bg-slate-900 text-white p-4 rounded font-mono text-sm">
                  jsonagents init
                </div>
              </div>

              {/* Validate */}
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">validate</h3>
                <p className="text-gray-700 mb-3">Validate manifests against the JSON Schema with watch mode support</p>
                <div className="bg-slate-900 text-white p-4 rounded font-mono text-sm">
                  <div className="mb-2">jsonagents validate manifest.json</div>
                  <div className="text-gray-400"># Watch for changes</div>
                  <div>jsonagents validate manifest.json --watch</div>
                </div>
              </div>

              {/* Convert */}
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">convert</h3>
                <p className="text-gray-700 mb-3">Convert between JSON and YAML formats</p>
                <div className="bg-slate-900 text-white p-4 rounded font-mono text-sm">
                  <div className="mb-2">jsonagents convert manifest.json manifest.yaml</div>
                  <div>jsonagents convert manifest.yaml manifest.json</div>
                </div>
              </div>

              {/* Format */}
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">format</h3>
                <p className="text-gray-700 mb-3">Format JSON files (pretty-print or minify)</p>
                <div className="bg-slate-900 text-white p-4 rounded font-mono text-sm">
                  <div className="mb-2">jsonagents format manifest.json</div>
                  <div>jsonagents format manifest.json --minify</div>
                </div>
              </div>

              {/* Info */}
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">info</h3>
                <p className="text-gray-700 mb-3">Display detailed information about a manifest</p>
                <div className="bg-slate-900 text-white p-4 rounded font-mono text-sm">
                  jsonagents info manifest.json
                </div>
              </div>

              {/* Search */}
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">search</h3>
                <p className="text-gray-700 mb-3">Search for agents in the registry</p>
                <div className="bg-slate-900 text-white p-4 rounded font-mono text-sm">
                  jsonagents search customer-support
                </div>
              </div>

              {/* Fetch */}
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">fetch</h3>
                <p className="text-gray-700 mb-3">Download manifests from the registry or URL</p>
                <div className="bg-slate-900 text-white p-4 rounded font-mono text-sm">
                  <div className="mb-2">jsonagents fetch agent-id ./output.json</div>
                  <div>jsonagents fetch https://example.com/manifest.json</div>
                </div>
              </div>

              {/* Test Policy */}
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">test-policy</h3>
                <p className="text-gray-700 mb-3">Test policy expressions with custom context</p>
                <div className="bg-slate-900 text-white p-4 rounded font-mono text-sm">
                  jsonagents test-policy "user.role === 'admin'"
                </div>
              </div>

              {/* Test URI */}
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">test-uri</h3>
                <p className="text-gray-700 mb-3">Validate and parse ajson:// URIs</p>
                <div className="bg-slate-900 text-white p-4 rounded font-mono text-sm">
                  jsonagents test-uri ajson://example.com/agent/v1
                </div>
              </div>
            </div>
          </div>

          {/* Templates */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Templates</h2>
            <p className="text-gray-700 mb-6">The <code className="bg-gray-100 px-2 py-1 rounded">init</code> command provides 8 pre-built templates:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-300 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Router Agent</h4>
                <p className="text-sm text-gray-600">Routes requests to specialized agents</p>
              </div>
              <div className="border border-gray-300 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Q&A Agent</h4>
                <p className="text-sm text-gray-600">Answers questions from knowledge base</p>
              </div>
              <div className="border border-gray-300 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Summarization Agent</h4>
                <p className="text-sm text-gray-600">Summarizes long documents</p>
              </div>
              <div className="border border-gray-300 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Content Generation</h4>
                <p className="text-sm text-gray-600">Creates various content types</p>
              </div>
              <div className="border border-gray-300 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Retrieval Agent</h4>
                <p className="text-sm text-gray-600">Searches and retrieves information</p>
              </div>
              <div className="border border-gray-300 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Classification Agent</h4>
                <p className="text-sm text-gray-600">Categorizes and tags content</p>
              </div>
              <div className="border border-gray-300 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Extraction Agent</h4>
                <p className="text-sm text-gray-600">Extracts structured data</p>
              </div>
              <div className="border border-gray-300 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Custom Agent</h4>
                <p className="text-sm text-gray-600">Start from scratch</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Features</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Interactive manifest creation</strong> with Inquirer prompts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Schema validation</strong> with detailed error reporting using AJV</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Watch mode</strong> for continuous validation during development</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Format conversion</strong> between JSON and YAML</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Pretty-print and minify</strong> JSON files</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Policy expression testing</strong> for access control rules</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>URI validation</strong> for ajson:// scheme</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>8 pre-built templates</strong> for common agent patterns</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Resources</h2>
            <div className="space-y-3">
              <a href="https://github.com/JSON-AGENTS/Jsonagents/tree/main/packages/cli" className="flex items-center gap-2 text-blue-600 hover:underline">
                <Github size={20} />
                View CLI source code on GitHub
              </a>
              <a href="/validators" className="text-blue-600 hover:underline block">→ Check out the Validators</a>
              <a href="/getting-started" className="text-blue-600 hover:underline block">→ Getting Started Guide</a>
              <a href="/schema" className="text-blue-600 hover:underline block">→ View JSON Schema</a>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-6 pb-8 border-t">
        <div className="w-full max-w-3xl mx-auto px-8 text-center">
          <p className="text-sm text-gray-600">Part of the <a href="/" className="text-blue-600 hover:underline">JSON Agents</a> specification</p>
        </div>
      </footer>
    </div>
  );
}
