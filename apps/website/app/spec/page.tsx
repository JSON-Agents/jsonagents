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

export default function SpecPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    fetch("/Standard/json-agents.md")
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
    { id: "portable-agent-manifest-pam-specification", title: "Portable Agent Manifest (PAM) Specification" },
    { id: "status-of-this-memo", title: "Status of this Memo" },
    { id: "copyright-notice", title: "Copyright Notice" },
    { id: "abstract", title: "Abstract" },
    { id: "table-of-contents", title: "Table of Contents" },
    { id: "1-introduction", title: "1. Introduction" },
    { id: "2-requirements-and-conventions", title: "2. Requirements and Conventions" },
    { id: "3-terminology", title: "3. Terminology" },
    { id: "4-design-overview", title: "4. Design Overview" },
    { id: "5-top-level-manifest-structure", title: "5. Top-Level Manifest Structure" },
    { id: "6-core-profile-core", title: "6. Core Profile (core)" },
    { id: "7-exec-profile-exec", title: "7. Exec Profile (exec)" },
    { id: "8-gov-profile-gov", title: "8. Gov Profile (gov)" },
    { id: "9-graph-profile-graph", title: "9. Graph Profile (graph)" },
    { id: "10-extensions-and-namespaces", title: "10. Extensions and Namespaces" },
    { id: "11-conformance", title: "11. Conformance" },
    { id: "12-security-considerations", title: "12. Security Considerations" },
    { id: "13-example-manifests", title: "13. Example Manifests" },
    { id: "14-registry-considerations", title: "14. Registry Considerations" },
    { id: "15-iana-considerations", title: "15. IANA Considerations" },
    { id: "16-uri-scheme-definition", title: "16. URI Scheme Definition" },
    { id: "17-references", title: "17. References" },
    { id: "appendix-a-normative-json-schema", title: "Appendix A. Normative JSON Schema" },
    { id: "appendix-b-policy-expression-language", title: "Appendix B. Policy Expression Language" }
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
        { label: "Specification" }
      ]} />

      {/* Hero */}
      <section className="bg-gray-200 py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 400 }}>
            JSON Agents Specification
          </h1>
          <p className="text-xl text-gray-700">
            Complete normative specification defining the Portable Agent Manifest (PAM) format
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
