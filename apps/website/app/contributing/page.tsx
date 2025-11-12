"use client";

import { Github } from "lucide-react";
import QuickLinks from "../components/QuickLinks";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ContributingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-slate-900">
        <div className="w-full max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <a href="/">
            <img src="/images/jsonagents-no-background-logo.webp" alt="JSON AGENTS" className="h-8 invert" />
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

      <Breadcrumbs items={[{ label: "Contributing" }]} />

      {/* Hero */}
      <section className="bg-gray-200 py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 400 }}>
            Contributing
          </h1>
          <p className="text-xl text-gray-700">
            Help improve the JSON Agents specification and ecosystem
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="w-full max-w-4xl mx-auto px-8">
          
          <p className="text-gray-700 leading-relaxed mb-8">
            Thank you for your interest in improving <strong>JSON Agents</strong> — the open specification for defining portable AI agents.
          </p>

          {/* Guiding Principles */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Guiding Principles</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Neutrality</h3>
                <p className="text-gray-700">JSON Agents aims to remain framework-agnostic and vendor-neutral.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Clarity over complexity</h3>
                <p className="text-gray-700">Favor explicit field definitions, clear JSON examples, and human-readable schema descriptions.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Backward compatibility</h3>
                <p className="text-gray-700">All revisions should strive to remain compatible with previously valid manifests whenever possible.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Extensibility</h3>
                <p className="text-gray-700">Use the <code className="bg-gray-100 px-2 py-1 rounded text-sm">extensions</code> or <code className="bg-gray-100 px-2 py-1 rounded text-sm">x-*</code> namespaces for experimentation and forward-looking ideas.</p>
              </div>
            </div>
          </div>

          {/* Ways to Contribute */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Ways to Contribute</h2>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Improve documentation:</strong> fix typos, clarify examples, or improve formatting.</li>
              <li><strong>Propose schema changes:</strong> add or refine properties in the JSON Schema.</li>
              <li><strong>Suggest new profiles:</strong> expand functionality while keeping the core minimal.</li>
              <li><strong>Add examples:</strong> new agent configurations, tool schemas, or graph topologies.</li>
              <li><strong>Discuss interoperability:</strong> map how existing frameworks could align with JSON Agents.</li>
            </ul>
          </div>

          {/* Development Setup */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Development Setup</h2>
            <div className="space-y-4">
              <p className="text-gray-700">1. Fork the repository.</p>
              <p className="text-gray-700">2. Create a new branch for your contribution:</p>
              <pre className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm overflow-x-auto">
{`git checkout -b feature/your-change`}
              </pre>
              <p className="text-gray-700">3. Make your edits and run a JSON Schema validation test:</p>
              <pre className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm overflow-x-auto">
{`npm install -g ajv-cli
ajv validate -s schema/json-agents.json -d examples/*.json`}
              </pre>
              <p className="text-gray-700">4. Commit and push your changes:</p>
              <pre className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm overflow-x-auto">
{`git commit -m "Update schema: added 'metrics_enabled' property"
git push origin feature/your-change`}
              </pre>
              <p className="text-gray-700">5. Open a pull request describing your proposal.</p>
            </div>
          </div>

          {/* Validation */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Validation</h2>
            <p className="text-gray-700 mb-4">All pull requests must include:</p>
            <ul className="space-y-2 text-gray-700">
              <li>A <strong>valid JSON Schema</strong> that passes <code className="bg-gray-100 px-2 py-1 rounded text-sm">ajv</code> validation.</li>
              <li>Updated or new <strong>examples</strong> demonstrating your change.</li>
              <li>A note in <code className="bg-gray-100 px-2 py-1 rounded text-sm">CHANGELOG.md</code> summarizing the update.</li>
            </ul>
          </div>

          {/* File Naming Conventions */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">File Naming Conventions</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 bg-gray-50 font-medium text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 bg-gray-50 font-medium text-gray-900">Directory</th>
                    <th className="text-left py-3 px-4 bg-gray-50 font-medium text-gray-900">Convention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700">Specification</td>
                    <td className="py-3 px-4 text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded text-sm">/json-agents.md</code></td>
                    <td className="py-3 px-4 text-gray-700">Lowercase with hyphen</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700">Schema</td>
                    <td className="py-3 px-4 text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded text-sm">/schema/json-agents.json</code></td>
                    <td className="py-3 px-4 text-gray-700">One canonical schema per version</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700">Examples</td>
                    <td className="py-3 px-4 text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded text-sm">/examples/</code></td>
                    <td className="py-3 px-4 text-gray-700">Descriptive names</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700">Docs</td>
                    <td className="py-3 px-4 text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded text-sm">/docs/</code></td>
                    <td className="py-3 px-4 text-gray-700">Markdown files for guides</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700">Registries</td>
                    <td className="py-3 px-4 text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded text-sm">/registry/</code></td>
                    <td className="py-3 px-4 text-gray-700">JSON lists defining canonical identifiers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pull Request Template */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Pull Request Template</h2>
            <p className="text-gray-700 mb-4">Each pull request should contain:</p>
            <pre className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm overflow-x-auto">
{`### Summary
Brief explanation of the proposed change.

### Motivation
Why this change improves the standard.

### Impact
Does it affect backward compatibility?

### Example
JSON snippet demonstrating the change.`}
            </pre>
          </div>

          {/* Discussion and Governance */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Discussion and Governance</h2>
            <p className="text-gray-700 mb-4">
              Decisions are reached through open discussion and consensus within GitHub issues and pull requests. Major changes (e.g., new profiles or schema rewrites) should begin as <strong>Proposals</strong> in <code className="bg-gray-100 px-2 py-1 rounded text-sm">/docs/proposals/</code>.
            </p>
          </div>

          {/* Licensing */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Licensing</h2>
            <p className="text-gray-700">
              All contributions are licensed under the <strong>Apache 2.0 License</strong>, as stated in the root <code className="bg-gray-100 px-2 py-1 rounded text-sm">LICENSE</code> file. By contributing, you agree that your submissions will be released under this license.
            </p>
          </div>

          {/* Code of Conduct */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Code of Conduct</h2>
            <p className="text-gray-700">
              All contributors are expected to follow professional and respectful communication practices. See the <a href="/code-of-conduct" className="text-slate-700 underline hover:text-slate-900">Code of Conduct</a> for more information.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gray-50 border border-gray-300 rounded-lg text-center">
            <p className="text-gray-900 text-lg mb-4">Thank you for helping shape the future of portable AI agent interoperability</p>
            <a
              href="https://github.com/JSON-AGENTS/Standard"
              className="inline-block px-8 py-3 bg-slate-800 text-white text-sm font-medium rounded hover:bg-slate-700 transition"
            >
              View on GitHub
            </a>
          </div>

          {/* Quick Links */}
          <QuickLinks
            links={[
              {
                title: "GitHub Repository",
                href: "https://github.com/JSON-AGENTS/Standard",
                description: "Access the complete source code, submit issues, and view pull requests for the JSON Agents standard"
              },
              {
                title: "Getting Started",
                href: "/getting-started",
                description: "Learn the basics of JSON Agents to understand what you're contributing to and how it works"
              },
              {
                title: "Documentation",
                href: "/docs",
                description: "Browse the complete documentation hub with specifications, guides, and reference materials"
              },
              {
                title: "Full Specification",
                href: "/spec",
                description: "Read the normative specification to understand the structure and requirements for contributions"
              }
            ]}
          />

        </div>
      </section>
    </div>
  );
}
