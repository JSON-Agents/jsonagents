"use client";

import { Github, CheckCircle } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";

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

      <Breadcrumbs items={[{ label: "Validators" }]} />

      {/* Hero Section */}
      <section className="bg-gray-200 py-16">
        <div className="w-full max-w-4xl mx-auto px-8">
          <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 400 }}>
            Validators
          </h1>
          <p className="text-xl text-gray-700">
            Production-ready validators for Python and TypeScript
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="w-full max-w-4xl mx-auto px-8">
          
          {/* GitHub Link */}
          <div className="mb-8">
            <a
              href="https://github.com/JSON-AGENTS/Jsonagents/tree/main/validators"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
            >
              <Github size={20} />
              <span className="text-sm font-medium">View source on GitHub</span>
            </a>
          </div>

          {/* Installation */}
          <div className="mb-16">
            <h2 className="text-3xl text-gray-900 font-light mb-6">Installation</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-4">Python</h3>
            <div className="bg-gray-50 text-gray-800 p-6 rounded-lg font-mono text-sm mb-6">
              <div className="mb-2 text-gray-600"># Install via pip (coming soon)</div>
              <div>Coming soon.</div>
            </div>

            <h3 className="text-xl font-medium text-gray-900 mb-4">TypeScript/JavaScript</h3>
            <div className="bg-gray-50 text-gray-800 p-6 rounded-lg font-mono text-sm mb-4">
              <div className="mb-2 text-gray-600"># Install via npm (coming soon)</div>
              <div>Coming soon.</div>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              📦 Package publishing coming soon. For now, install from source in <code className="bg-gray-100 px-2 py-1 rounded">validators/python</code> or <code className="bg-gray-100 px-2 py-1 rounded">validators/typescript</code>
            </p>
          </div>

          {/* Quick Start */}
          <div className="mb-16">
            <h2 className="text-3xl text-gray-900 font-light mb-6">Quick Start</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-4">Python Validator</h3>
            <div className="bg-gray-50 p-6 rounded-lg font-mono text-sm mb-6 overflow-x-auto">
              <pre className="whitespace-pre-wrap text-gray-800">
{`from jsonagents import validate

agent_data = {
  "name": "MyAgent",
  "version": "1.0.0",
  "capabilities": ["action", "query"]
}

result = validate(agent_data)
print(result.valid)`}
              </pre>
            </div>

            <h3 className="text-xl font-medium text-gray-900 mb-4">TypeScript Validator</h3>
            <div className="bg-gray-50 p-6 rounded-lg font-mono text-sm mb-6 overflow-x-auto">
              <pre className="whitespace-pre-wrap text-gray-800">
{`import { validate } from '@jsonagents/validator';

const agentData = {
  name: "MyAgent",
  version: "1.0.0",
  capabilities: ["action", "query"]
};

const result = validate(agentData);
console.log(result.valid);`}
              </pre>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl text-gray-900 font-light mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Schema Validation</h3>
                <p className="text-gray-600">Comprehensive validation against JSON Agents specification</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Policy Enforcement</h3>
                <p className="text-gray-600">Validate agent policies and security constraints</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">URI Validation</h3>
                <p className="text-gray-600">Validate JSON Agents URI scheme compliance</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Error Reports</h3>
                <p className="text-gray-600">Clear error messages with field-level validation details</p>
              </div>
            </div>
          </div>

          {/* Available Validators */}
          <div className="mb-16">
            <h2 className="text-3xl text-gray-900 font-light mb-6">Available Validators</h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-slate-700" />
                  <h3 className="text-xl font-medium text-gray-900">Python Validator</h3>
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
                  <CheckCircle className="h-6 w-6 text-slate-700" />
                  <h3 className="text-xl font-medium text-gray-900">TypeScript Validator</h3>
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

          {/* Running Tests */}
          <div className="mb-16">
            <h2 className="text-3xl text-gray-900 font-light mb-6">Running Tests</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-4">Python</h3>
            <div className="bg-gray-50 text-gray-800 p-4 rounded font-mono text-sm mb-6">
              <div>cd validators/python</div>
              <div>pytest</div>
            </div>

            <h3 className="text-xl font-medium text-gray-900 mb-4">TypeScript</h3>
            <div className="bg-gray-50 text-gray-800 p-4 rounded font-mono text-sm">
              <div>cd validators/typescript</div>
              <div>npm test</div>
            </div>
          </div>

          {/* Links */}
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-2xl text-gray-900 font-light mb-4">Resources</h2>
            <div className="space-y-3">
              <a href="https://github.com/JSON-AGENTS/Jsonagents/tree/main/validators" className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition">
                <Github size={20} />
                View validator source code on GitHub
              </a>
              <a href="/cli" className="text-slate-700 hover:text-slate-900 transition block">→ Check out the CLI Tool</a>
              <a href="/getting-started" className="text-slate-700 hover:text-slate-900 transition block">→ Getting Started Guide</a>
              <a href="/schema" className="text-slate-700 hover:text-slate-900 transition block">→ View JSON Schema</a>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-6 pb-8 border-t">
        <div className="w-full max-w-3xl mx-auto px-8 text-center">
          <p className="text-sm text-gray-600">Part of the <a href="/" className="text-slate-700 hover:text-slate-900 transition">JSON Agents</a> specification</p>
        </div>
      </footer>
    </div>
  );
}
