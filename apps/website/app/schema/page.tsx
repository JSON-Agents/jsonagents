"use client";

import Link from "next/link";
import { FileJson, Package, Box, Github } from "lucide-react";
import QuickLinks from "../components/QuickLinks";
import Breadcrumbs from "../components/Breadcrumbs";

export default function SchemaPage() {
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

      <Breadcrumbs items={[{ label: "Schema" }]} />

      {/* Hero */}
      <section className="bg-gray-200 py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 400 }}>
            Schema Reference
          </h1>
          <p className="text-xl text-gray-700">
            JSON Schema 2020-12 validated structures for agents, capabilities, and messages
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          
          {/* Core Schemas */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Core Schemas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <a href="/json-schema" className="block p-6 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-start gap-4">
                  <FileJson className="text-slate-800 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Portable Agent Manifest</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Main manifest schema defining agents with core, exec, gov, and graph profiles
                    </p>
                    <span className="text-xs text-slate-600">json-agents.json</span>
                  </div>
                </div>
              </a>

              <a href="/json/schema/message-envelope.json" className="block p-6 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-start gap-4">
                  <FileJson className="text-slate-800 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Message Envelope</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Standard message format for inter-agent communication
                    </p>
                    <span className="text-xs text-slate-600">message-envelope.json</span>
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Capabilities */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Standard Capabilities</h2>
            <p className="text-gray-600 mb-6">
              Seven reusable capability schemas that define standard agent behaviors
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <a href="/json/schema/capabilities/summarization.json" className="block p-4 border border-gray-300 rounded hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <Package className="text-slate-800" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Summarization</h3>
                    <p className="text-xs text-gray-600">Condense content into summaries</p>
                  </div>
                </div>
              </a>

              <a href="/json/schema/capabilities/routing.json" className="block p-4 border border-gray-300 rounded hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <Package className="text-slate-800" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Routing</h3>
                    <p className="text-xs text-gray-600">Direct messages to targets</p>
                  </div>
                </div>
              </a>

              <a href="/json/schema/capabilities/retrieval.json" className="block p-4 border border-gray-300 rounded hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <Package className="text-slate-800" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Retrieval</h3>
                    <p className="text-xs text-gray-600">Search and fetch information</p>
                  </div>
                </div>
              </a>

              <a href="/json/schema/capabilities/qa.json" className="block p-4 border border-gray-300 rounded hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <Package className="text-slate-800" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Question Answering</h3>
                    <p className="text-xs text-gray-600">Answer queries with context</p>
                  </div>
                </div>
              </a>

              <a href="/json/schema/capabilities/classification.json" className="block p-4 border border-gray-300 rounded hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <Package className="text-slate-800" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Classification</h3>
                    <p className="text-xs text-gray-600">Categorize input data</p>
                  </div>
                </div>
              </a>

              <a href="/json/schema/capabilities/extraction.json" className="block p-4 border border-gray-300 rounded hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <Package className="text-slate-800" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Extraction</h3>
                    <p className="text-xs text-gray-600">Extract entities and data</p>
                  </div>
                </div>
              </a>

              <a href="/json/schema/capabilities/generation.json" className="block p-4 border border-gray-300 rounded hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <Package className="text-slate-800" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Generation</h3>
                    <p className="text-xs text-gray-600">Create new content</p>
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Extensions */}
          <div className="mb-16">
            <h2 className="text-3xl mb-6 text-gray-900 font-light">Extensions</h2>
            <p className="text-gray-600 mb-6">
              Optional extension schemas for specialized functionality
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <a href="/json/schema/extensions/audit.json" className="block p-4 border border-gray-300 rounded hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <Box className="text-slate-800" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Audit Extension</h3>
                    <p className="text-xs text-gray-600">Comprehensive audit trail and compliance logging</p>
                  </div>
                </div>
              </a>

              <a href="/json/schema/extensions/memory.json" className="block p-4 border border-gray-300 rounded hover:border-gray-400 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <Box className="text-slate-800" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Memory Extension</h3>
                    <p className="text-xs text-gray-600">Persistent state and conversation history</p>
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <QuickLinks
            links={[
              {
                title: "JSON Schema Viewer",
                href: "/json-schema",
                description: "Explore the interactive JSON Schema 2020-12 definition with collapsible sections and detailed field information"
              },
              {
                title: "Examples",
                href: "/examples",
                description: "Browse working examples demonstrating each profile, capability, and extension schema in practice"
              },
              {
                title: "Getting Started",
                href: "/getting-started",
                description: "Quick introduction to JSON Agents with basic schema usage and validation examples"
              },
              {
                title: "Extensions Guide",
                href: "/extensions",
                description: "Learn how to create custom extension schemas using the x-* namespace for specialized functionality"
              }
            ]}
          />

        </div>
      </section>
    </div>
  );
}
