"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github.css';
import QuickLinks from "../components/QuickLinks";
import Breadcrumbs from "../components/Breadcrumbs";

export default function SpecDraftPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    fetch("/Standard/draft-jsonagents-spec-00.md")
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load spec:", err);
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
  }, [content]);

  const tocSections = [
    { id: "1-introduction", title: "1. Introduction" },
    { id: "2-terminology", title: "2. Terminology" },
    { id: "3-design-goals", title: "3. Design Goals" },
    { id: "4-json-schema-conformance", title: "4. JSON Schema Conformance" },
    { id: "5-core-structure", title: "5. Core Structure" },
    { id: "6-profiles", title: "6. Profiles" },
    { id: "7-capabilities-and-tools", title: "7. Capabilities and Tools" },
    { id: "8-governance", title: "8. Governance" },
    { id: "9-graph-composition", title: "9. Graph Composition" },
    { id: "10-extensions", title: "10. Extensions" },
    { id: "11-security-considerations", title: "11. Security Considerations" },
    { id: "12-uri-scheme", title: "12. URI Scheme" },
    { id: "13-policy-expression-language", title: "13. Policy Expression Language" },
    { id: "14-iana-considerations", title: "14. IANA Considerations" },
    { id: "15-acknowledgments", title: "15. Acknowledgments" }
  ];

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
        { label: "IETF Draft" }
      ]} />

      {/* Hero */}
      <section className="bg-gray-200 py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 400 }}>
            IETF Draft Format
          </h1>
          <p className="text-xl text-gray-700">
            Standards-track document formatted per IETF conventions
          </p>
          <p className="text-sm text-gray-600 mt-2">
            draft-jsonagents-spec-00
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="w-full max-w-7xl mx-auto px-8">
          {loading ? (
            <div className="text-gray-600">Loading specification...</div>
          ) : (
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
              <article className="markdown-content flex-1 max-w-4xl">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug, rehypeHighlight]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-4xl font-light text-gray-900 mb-6 mt-12 first:mt-0" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-3xl font-light text-gray-900 mb-4 mt-10 border-b border-gray-200 pb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-2xl font-light text-gray-900 mb-3 mt-8" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-xl font-medium text-gray-900 mb-2 mt-6" {...props} />,
                    h5: ({node, ...props}) => <h5 className="text-lg font-medium text-gray-900 mb-2 mt-4" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                    a: ({node, ...props}) => <a className="text-slate-700 underline hover:text-slate-900 transition" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc space-y-2 mb-4 ml-6 marker:text-gray-600" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal space-y-2 mb-4 ml-6 text-gray-700" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-700 leading-relaxed pl-2" {...props} />,
                    code: ({node, inline, ...props}: any) =>
                      inline
                        ? <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800 whitespace-nowrap" {...props} />
                        : <code className="block text-sm font-mono" {...props} />,
                    pre: ({node, ...props}) => (
                      <pre className="bg-gray-50 border border-gray-300 rounded-lg p-4 overflow-x-auto mb-6 mt-4" {...props} />
                    ),
                    blockquote: ({node, ...props}) => (
                      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />
                    ),
                    table: ({node, ...props}) => (
                      <div className="overflow-x-auto my-6">
                        <table className="w-full border-collapse" {...props} />
                      </div>
                    ),
                    thead: ({node, ...props}) => <thead className="bg-gray-50" {...props} />,
                    th: ({node, ...props}) => (
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900" {...props} />
                    ),
                    td: ({node, ...props}) => (
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 leading-relaxed align-top" {...props} />
                    ),
                    hr: ({node, ...props}) => <hr className="my-8 border-gray-300" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                    em: ({node, ...props}) => <em className="italic text-gray-800" {...props} />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      {!loading && (
        <section className="pb-16">
          <div className="w-full max-w-4xl mx-auto px-8">
            <QuickLinks
              links={[
                {
                  title: "Getting Started",
                  href: "/getting-started",
                  description: "Quick introduction to JSON Agents with practical examples and setup instructions"
                },
                {
                  title: "Schema Reference",
                  href: "/schema",
                  description: "Browse JSON Schema 2020-12 definitions for all manifest fields and validation rules"
                },
                {
                  title: "Examples",
                  href: "/examples",
                  description: "Explore complete working examples demonstrating all four profiles and standard capabilities"
                },
                {
                  title: "Implementer's Guide",
                  href: "/implementers-guide",
                  description: "Step-by-step guide for parsing, validating, and integrating JSON Agents into your framework"
                }
              ]}
            />
          </div>
        </section>
      )}
    </div>
  );
}
