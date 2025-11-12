"use client";

import { useState, useEffect } from "react";
import { Github } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github.css';
import Breadcrumbs from "../components/Breadcrumbs";
import QuickLinks from "../components/QuickLinks";

export default function FrameworkMappingsPage() {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    fetch('/Standard/docs/mapping-frameworks.md')
      .then(res => res.text())
      .then(text => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load mapping-frameworks.md:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    const headings = document.querySelectorAll("h2[id]");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [markdown]);

  const tocSections = [
    { id: "purpose", title: "Purpose" },
    { id: "1-alignment-philosophy", title: "1. Alignment Philosophy" },
    { id: "11-conversion-patterns", title: "1.1 Conversion Patterns" },
    { id: "2-mapping-summary", title: "2. Mapping Summary" },
    { id: "3-langchain-example-conversion", title: "3. LangChain Example Conversion" },
    { id: "4-openai-manifest-mapping", title: "4. OpenAI Manifest Mapping" },
    { id: "5-mcp-model-context-protocol-mapping", title: "5. MCP (Model Context Protocol) Mapping" },
    { id: "6-autogen--multi-agent-graphs", title: "6. AutoGen / Multi-Agent Graphs" },
    { id: "7-yaml--json-interoperability", title: "7. YAML ↔ JSON Interoperability" },
    { id: "8-limitations-and-mismatches", title: "8. Limitations and Mismatches" },
    { id: "9-conversion-utilities", title: "9. Conversion Utilities" },
    { id: "10-implementation-notes", title: "10. Implementation Notes" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

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

      <Breadcrumbs items={[
        { label: "Docs", href: "/docs" },
        { label: "Framework Mappings" }
      ]} />

      {/* Hero */}
      <section className="bg-gray-200 py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 400 }}>
            Framework Mappings
          </h1>
          <p className="text-xl text-gray-700">
            Convert between JSON Agents and popular AI agent frameworks
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="flex gap-8">
            {/* Table of Contents Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 px-4">On This Page</h3>
                <nav className="space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  {tocSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block px-4 py-2 text-sm transition-colors border-l-2 ${
                        activeSection === section.id
                          ? "border-slate-800 text-slate-900 font-medium bg-gray-50"
                          : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(section.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                        });
                      }}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <article className="prose prose-slate max-w-none flex-1">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, rehypeRaw, rehypeHighlight]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-4xl font-light text-gray-900 mb-6 mt-12" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-3xl font-light text-gray-900 mb-4 mt-10" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-2xl font-normal text-gray-900 mb-3 mt-8" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-xl font-medium text-gray-800 mb-2 mt-6" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-gray-700 leading-relaxed mb-4" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-slate-700 underline hover:text-slate-900" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-gray-700" {...props} />
                  ),
                  code: ({ node, inline, ...props }: any) =>
                    inline ? (
                      <code className="bg-gray-100 text-sm px-2 py-1 rounded text-gray-900 whitespace-nowrap" {...props} />
                    ) : (
                      <code className="block bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm" {...props} />
                    ),
                  pre: ({ node, ...props }) => (
                    <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto mb-6" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full border border-gray-300" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-gray-100" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border border-gray-300 px-4 py-2 text-gray-700 leading-relaxed align-top" {...props} />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="my-8 border-gray-300" {...props} />
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="pb-16">
        <div className="w-full max-w-7xl mx-auto px-8">
          <QuickLinks
            links={[
              {
                title: "Implementer's Guide",
                href: "/implementers-guide",
                description: "Learn how to parse, validate, and operationalize JSON Agents manifests in your runtime environment"
              },
              {
                title: "Getting Started",
                href: "/getting-started",
                description: "Quick introduction to JSON Agents with basic examples and setup instructions"
              },
              {
                title: "Examples",
                href: "/examples",
                description: "Browse real-world agent implementations across different profiles and use cases"
              },
              {
                title: "Extensions Guide",
                href: "/extensions",
                description: "Create custom extensions using the x-* namespace to add framework-specific functionality"
              }
            ]}
          />
        </div>
      </section>
    </div>
  );
}
