"use client";

import { FileText, Book, Map, Puzzle, Github } from "lucide-react";
import QuickLinks from "../components/QuickLinks";
import Breadcrumbs from "../components/Breadcrumbs";

export default function DocsPage() {
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

      <Breadcrumbs items={[{ label: "Documentation" }]} />

      {/* Hero */}
      <section className="bg-gray-200 py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 400 }}>
            Documentation
          </h1>
          <p className="text-xl text-gray-700">
            Complete reference for the JSON Agents Portable Agent Manifest specification
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          
          {/* Specification */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Core Specification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <a href="/spec" className="block p-6 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-start gap-4">
                  <FileText className="text-slate-800 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">JSON Agents Specification</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Complete normative specification defining the Portable Agent Manifest (PAM) format
                    </p>
                    <span className="text-xs text-slate-600">888 lines • Sections 1-17 • Appendices A-B</span>
                  </div>
                </div>
              </a>

              <a href="/spec-draft" className="block p-6 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-start gap-4">
                  <FileText className="text-slate-800 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">IETF Draft Format</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Standards-track document formatted per IETF conventions
                    </p>
                    <span className="text-xs text-slate-600">draft-jsonagents-spec-00</span>
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Guides */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Implementation Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <a href="/implementers-guide" className="block p-6 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-start gap-4">
                  <Book className="text-slate-800 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Implementer's Guide</h3>
                    <p className="text-gray-600 text-sm">
                      Step-by-step guide to implementing JSON Agents in your framework
                    </p>
                  </div>
                </div>
              </a>

              <a href="/framework-mappings" className="block p-6 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-start gap-4">
                  <Map className="text-slate-800 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Framework Mappings</h3>
                    <p className="text-gray-600 text-sm">
                      Convert between JSON Agents and LangChain, OpenAI, AutoGen, MCP
                    </p>
                  </div>
                </div>
              </a>

              <a href="/extensions" className="block p-6 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-start gap-4">
                  <Puzzle className="text-slate-800 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Extensions Guide</h3>
                    <p className="text-gray-600 text-sm">
                      Create custom extensions using x-* namespaces and formal schemas
                    </p>
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Advanced Topics */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Advanced Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <a href="/uri-scheme" className="block p-6 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-start gap-4">
                  <FileText className="text-slate-800 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">URI Scheme</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Complete ajson:// URI specification with resolution, registry, and security
                    </p>
                    <span className="text-xs text-slate-600">Section 16 • IANA Registration</span>
                  </div>
                </div>
              </a>

              <a href="/policy-language" className="block p-6 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-start gap-4">
                  <FileText className="text-slate-800 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Policy Expression Language</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Grammar, operators, and examples for declarative policy expressions
                    </p>
                    <span className="text-xs text-slate-600">Appendix B • Complete Reference</span>
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">7 Standard Capabilities</h3>
                <div className="grid grid-cols-1 gap-2">
                  <a href="/json/schema/capabilities/summarization.json" className="text-gray-700 hover:text-slate-900 hover:underline transition">
                    Summarization
                  </a>
                  <a href="/json/schema/capabilities/routing.json" className="text-gray-700 hover:text-slate-900 hover:underline transition">
                    Routing
                  </a>
                  <a href="/json/schema/capabilities/retrieval.json" className="text-gray-700 hover:text-slate-900 hover:underline transition">
                    Retrieval
                  </a>
                  <a href="/json/schema/capabilities/qa.json" className="text-gray-700 hover:text-slate-900 hover:underline transition">
                    Question Answering (QA)
                  </a>
                  <a href="/json/schema/capabilities/classification.json" className="text-gray-700 hover:text-slate-900 hover:underline transition">
                    Classification
                  </a>
                  <a href="/json/schema/capabilities/extraction.json" className="text-gray-700 hover:text-slate-900 hover:underline transition">
                    Extraction
                  </a>
                  <a href="/json/schema/capabilities/generation.json" className="text-gray-700 hover:text-slate-900 hover:underline transition">
                    Generation
                  </a>
                </div>
                <a href="/schema" className="text-sm text-slate-700 hover:text-slate-900 underline mt-3 inline-block">View all schemas</a>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Four Modular Profiles</h3>
                <ul className="space-y-2 text-gray-700 mb-3">
                  <li><strong>Core</strong> — Identity, capabilities, tools, context</li>
                  <li><strong>Exec</strong> — Runtime and environment</li>
                  <li><strong>Gov</strong> — Security, policies, observability</li>
                  <li><strong>Graph</strong> — Multi-agent orchestration</li>
                </ul>
                <a href="/schema" className="text-sm text-slate-700 hover:text-slate-900 underline">View schemas</a>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">URI Scheme</h3>
                <p className="text-gray-700 mb-2">
                  Formal <code className="bg-gray-100 px-2 py-1 rounded text-sm">ajson://</code> URI scheme with resolution mechanism and registry architecture
                </p>
                <a href="/uri-scheme" className="text-sm text-slate-700 hover:text-slate-900 underline">Learn more</a>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Policy Language</h3>
                <p className="text-gray-700 mb-2">
                  Complete expression language for declarative access control and governance
                </p>
                <a href="/policy-language" className="text-sm text-slate-700 hover:text-slate-900 underline">Learn more</a>
              </div>

            </div>
          </div>

          {/* Related Resources */}
          <QuickLinks
            links={[
              {
                title: "Getting Started",
                href: "/getting-started",
                description: "Quick introduction to JSON Agents with setup instructions and your first agent manifest"
              },
              {
                title: "Full Specification",
                href: "/spec",
                description: "Complete normative specification with all profiles, schemas, and technical requirements"
              },
              {
                title: "Examples",
                href: "/examples",
                description: "Real-world examples demonstrating core, exec, gov, and graph profile implementations"
              },
              {
                title: "Schema Reference",
                href: "/schema",
                description: "Browse JSON Schema 2020-12 definitions for manifests, capabilities, and message envelopes"
              }
            ]}
          />

        </div>
      </section>
    </div>
  );
}
