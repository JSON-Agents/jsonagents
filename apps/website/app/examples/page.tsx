"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import QuickLinks from "../components/QuickLinks";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ExamplesPage() {
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

      <Breadcrumbs items={[{ label: "Examples" }]} />

      {/* Hero */}
      <section className="bg-gray-200 py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 400 }}>
            Examples
          </h1>
          <p className="text-xl text-gray-700">
            Real-world agent manifests showing progressive profile adoption
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          
          <p className="text-gray-600 mb-12 max-w-3xl">
            Each example builds upon the previous, demonstrating how to progressively adopt JSON Agents profiles
            based on your needs — from simple core agents to complex multi-agent orchestrations.
          </p>

          {/* Examples Grid */}
          <div className="space-y-8">
            
            {/* Core Only */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-6 border-b border-gray-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-light text-gray-900 mb-2">Core Profile Only</h2>
                    <p className="text-gray-600 mb-3">
                      Minimal agent manifest with identity, capabilities, and tools
                    </p>
                    <div className="flex gap-2 text-sm">
                      <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-slate-800">core</code>
                    </div>
                  </div>
                  <a 
                    href="/json/examples/core.json" 
                    className="px-4 py-2 bg-slate-800 text-white text-sm rounded hover:bg-slate-700 transition"
                  >
                    View JSON
                  </a>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-medium text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2 text-gray-600 text-sm list-disc list-inside">
                  <li>Agent identity (name, version, description)</li>
                  <li>Capabilities (summarization, routing, etc.)</li>
                  <li>Tool definitions</li>
                  <li>Context configuration</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  <strong className="text-gray-900">Use case:</strong> Simple standalone agents without runtime or governance requirements
                </p>
              </div>
            </div>

            {/* Core + Exec */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-6 border-b border-gray-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-light text-gray-900 mb-2">Core + Exec Profile</h2>
                    <p className="text-gray-600 mb-3">
                      Agent with runtime and execution environment configuration
                    </p>
                    <div className="flex gap-2 text-sm">
                      <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-slate-800">core</code>
                      <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-slate-800">exec</code>
                    </div>
                  </div>
                  <a 
                    href="/json/examples/core-exec.json" 
                    className="px-4 py-2 bg-slate-800 text-white text-sm rounded hover:bg-slate-700 transition"
                  >
                    View JSON
                  </a>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-medium text-gray-900 mb-3">Adds to Core:</h3>
                <ul className="space-y-2 text-gray-600 text-sm list-disc list-inside">
                  <li>Runtime platform specification</li>
                  <li>Model configuration (provider, version, parameters)</li>
                  <li>Environment variables</li>
                  <li>Resource requirements</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  <strong className="text-gray-900">Use case:</strong> Production-ready agents with specific deployment requirements
                </p>
              </div>
            </div>

            {/* Core + Exec + Gov */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-6 border-b border-gray-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-light text-gray-900 mb-2">Core + Exec + Gov Profile</h2>
                    <p className="text-gray-600 mb-3">
                      Agent with security policies, observability, and governance
                    </p>
                    <div className="flex gap-2 text-sm">
                      <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-slate-800">core</code>
                      <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-slate-800">exec</code>
                      <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-slate-800">gov</code>
                    </div>
                  </div>
                  <a 
                    href="/json/examples/core-exec-gov.json" 
                    className="px-4 py-2 bg-slate-800 text-white text-sm rounded hover:bg-slate-700 transition"
                  >
                    View JSON
                  </a>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-medium text-gray-900 mb-3">Adds to Core + Exec:</h3>
                <ul className="space-y-2 text-gray-600 text-sm list-disc list-inside">
                  <li>Security policies and access control</li>
                  <li>Sandbox configuration</li>
                  <li>Audit logging</li>
                  <li>Observability (metrics, traces, logs)</li>
                  <li>Cryptographic signatures</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  <strong className="text-gray-900">Use case:</strong> Enterprise agents requiring compliance, security, and monitoring
                </p>
              </div>
            </div>

            {/* Core + Exec + Gov + Graph */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-6 border-b border-gray-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-light text-gray-900 mb-2">Full Profile Stack</h2>
                    <p className="text-gray-600 mb-3">
                      Complete multi-agent system with orchestration topology
                    </p>
                    <div className="flex gap-2 text-sm">
                      <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-slate-800">core</code>
                      <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-slate-800">exec</code>
                      <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-slate-800">gov</code>
                      <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-slate-800">graph</code>
                    </div>
                  </div>
                  <a 
                    href="/json/examples/core-exec-gov-graph.json" 
                    className="px-4 py-2 bg-slate-800 text-white text-sm rounded hover:bg-slate-700 transition"
                  >
                    View JSON
                  </a>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-medium text-gray-900 mb-3">Adds to Core + Exec + Gov:</h3>
                <ul className="space-y-2 text-gray-600 text-sm list-disc list-inside">
                  <li>Multi-agent topology definition</li>
                  <li>Node and edge specifications</li>
                  <li>Conditional routing logic</li>
                  <li>Entry and exit points</li>
                  <li>Inter-agent communication flows</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  <strong className="text-gray-900">Use case:</strong> Complex agent networks, workflows, and collaborative systems
                </p>
              </div>
            </div>

          </div>

          {/* Quick Links */}
          <QuickLinks
            links={[
              {
                title: "Getting Started",
                href: "/getting-started",
                description: "Follow our step-by-step guide to create your first portable agent manifest in minutes."
              },
              {
                title: "Schema Reference",
                href: "/schema",
                description: "Explore detailed schema documentation for core structures and seven standard capabilities."
              },
              {
                title: "Implementer's Guide",
                href: "/implementers-guide",
                description: "Technical guide for framework integration, validation, and profile implementation."
              },
              {
                title: "Framework Mappings",
                href: "/framework-mappings",
                description: "Learn how to convert between JSON Agents and popular frameworks like LangChain and AutoGen."
              }
            ]}
          />

        </div>
      </section>
    </div>
  );
}
