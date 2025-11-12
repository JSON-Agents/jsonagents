"use client";

import { useState, useEffect } from "react";
import { Github, Code2, Shield, AlertCircle } from "lucide-react";
import QuickLinks from "../components/QuickLinks";
import Breadcrumbs from "../components/Breadcrumbs";

export default function PolicyLanguagePage() {
  const [activeSection, setActiveSection] = useState("");

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
  }, []);

  const tocSections = [
    { id: "purpose", title: "Purpose" },
    { id: "design-philosophy", title: "Design Philosophy" },
    { id: "grammar", title: "Grammar" },
    { id: "operators", title: "Operators" },
    { id: "operator-precedence", title: "Operator Precedence" },
    { id: "context-variables", title: "Context Variables" },
    { id: "examples", title: "Examples" },
    { id: "evaluation-semantics", title: "Evaluation Semantics" },
    { id: "implementation-guidance", title: "Implementation Guidance" }
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
        { label: "Advanced", href: "/docs" },
        { label: "Policy Language" }
      ]} />

      {/* Hero */}
      <section className="bg-gray-200 py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 400 }}>
            Policy Expression Language
          </h1>
          <p className="text-xl text-gray-700">
            Declarative expression language for <code className="bg-white px-2 py-1 rounded">policy.where</code> clauses
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
            <div className="flex-1">

          {/* Purpose */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="text-slate-800" size={32} />
              <h2 id="purpose" className="text-3xl text-gray-900 font-light">Purpose</h2>
            </div>
            <p className="text-gray-700 text-lg">
              The policy expression language provides a simple, safe, and deterministic way to define 
              access control and behavior constraints in <code className="bg-gray-100 px-2 py-1 rounded">policy.where</code> clauses.
            </p>
          </div>

          {/* Design Philosophy */}
          <div className="mb-16">
            <h2 id="design-philosophy" className="text-3xl mb-6 text-gray-900 font-light">Design Philosophy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Simple</h3>
                <p className="text-sm text-gray-700">Minimal syntax for common use cases</p>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Safe</h3>
                <p className="text-sm text-gray-700">No code execution or side effects</p>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Deterministic</h3>
                <p className="text-sm text-gray-700">Same input always produces same result</p>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">JSONPath-like</h3>
                <p className="text-sm text-gray-700">Familiar to developers using JSON query languages</p>
              </div>

            </div>
          </div>

          {/* Grammar */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <Code2 className="text-slate-800" size={32} />
              <h2 id="grammar" className="text-3xl text-gray-900 font-light">Grammar</h2>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto">
              <pre className="text-sm"><code>{`expression     = comparison | logical_expr | literal

comparison     = accessor operator value
logical_expr   = expression logical_op expression
               | "(" expression ")"
               | "not" expression

accessor       = identifier *("." identifier | "[" index "]")
identifier     = ALPHA *(ALPHA | DIGIT | "_")
index          = DIGIT+ | STRING

operator       = "==" | "!=" | ">" | "<" | ">=" | "<="
               | "~" | "!~" | "in" | "not in"
               | "contains" | "starts_with" | "ends_with"

logical_op     = "&&" | "||" | "and" | "or"

value          = STRING | NUMBER | BOOLEAN | NULL | array
array          = "[" [value *("," value)] "]"

STRING         = "'" *CHAR "'"
NUMBER         = ["-"] DIGIT+ ["." DIGIT+]
BOOLEAN        = "true" | "false"
NULL           = "null"`}</code></pre>
            </div>
          </div>

          {/* Operators */}
          <div className="mb-16">
            <h2 id="operators" className="text-3xl mb-6 text-gray-900 font-light">Operators</h2>
            
            {/* Comparison Operators */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Comparison Operators</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Operator</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>==</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Equality</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>tool.type == 'http'</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>!=</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Inequality</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>tool.type != 'system'</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>&gt;</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Greater than</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>message.priority &gt; 5</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>&lt;</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Less than</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>context.window &lt; 8192</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>&gt;=</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Greater or equal</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>runtime.memory_mb_min &gt;= 512</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>&lt;=</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Less or equal</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>runtime.cpu_cores_min &lt;= 4</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* String Operators */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">String Operators</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Operator</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>~</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Regex match</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>tool.endpoint ~ '^https://internal\\.corp'</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>!~</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Regex non-match</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>tool.endpoint !~ 'external'</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>contains</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Substring test</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>message.payload contains 'urgent'</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>starts_with</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Prefix test</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>agent.id starts_with 'ajson://internal'</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>ends_with</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Suffix test</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>tool.endpoint ends_with '.internal.corp'</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Collection Operators */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Collection Operators</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Operator</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>in</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Membership test</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>tool.type in ['http', 'function']</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>not in</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Non-membership</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>tool.type not in ['system', 'plugin']</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Logical Operators */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Logical Operators</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Operator</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>&amp;&amp;</code> / <code>and</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Logical AND</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>tool.type == 'http' &amp;&amp; tool.auth.method == 'none'</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>||</code> / <code>or</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Logical OR</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>message.priority &gt; 8 || message.urgent == true</code></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>not</code></td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Logical NOT</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm"><code>not (tool.type in ['system', 'plugin'])</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Operator Precedence */}
          <div className="mb-16">
            <h2 id="operator-precedence" className="text-3xl mb-6 text-gray-900 font-light">Operator Precedence</h2>
            
            <p className="text-gray-700 mb-4">From highest to lowest:</p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="space-y-2 text-gray-700">
                <li>1. <strong>Parentheses:</strong> <code className="bg-gray-100 px-2 py-1 rounded">( )</code></li>
                <li>2. <strong>Unary:</strong> <code className="bg-gray-100 px-2 py-1 rounded">not</code></li>
                <li>3. <strong>Comparison:</strong> <code className="bg-gray-100 px-2 py-1 rounded">==</code>, <code className="bg-gray-100 px-2 py-1 rounded">!=</code>, <code className="bg-gray-100 px-2 py-1 rounded">&gt;</code>, <code className="bg-gray-100 px-2 py-1 rounded">&lt;</code>, <code className="bg-gray-100 px-2 py-1 rounded">&gt;=</code>, <code className="bg-gray-100 px-2 py-1 rounded">&lt;=</code></li>
                <li>4. <strong>String/Collection:</strong> <code className="bg-gray-100 px-2 py-1 rounded">~</code>, <code className="bg-gray-100 px-2 py-1 rounded">!~</code>, <code className="bg-gray-100 px-2 py-1 rounded">in</code>, <code className="bg-gray-100 px-2 py-1 rounded">not in</code>, <code className="bg-gray-100 px-2 py-1 rounded">contains</code>, <code className="bg-gray-100 px-2 py-1 rounded">starts_with</code>, <code className="bg-gray-100 px-2 py-1 rounded">ends_with</code></li>
                <li>5. <strong>Logical AND:</strong> <code className="bg-gray-100 px-2 py-1 rounded">&amp;&amp;</code>, <code className="bg-gray-100 px-2 py-1 rounded">and</code></li>
                <li>6. <strong>Logical OR:</strong> <code className="bg-gray-100 px-2 py-1 rounded">||</code>, <code className="bg-gray-100 px-2 py-1 rounded">or</code></li>
              </ol>
            </div>
          </div>

          {/* Context Variables */}
          <div className="mb-16">
            <h2 id="context-variables" className="text-3xl mb-6 text-gray-900 font-light">Context Variables</h2>
            
            <p className="text-gray-700 mb-6">
              Expressions evaluate against a context object containing:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto">
              <pre className="text-sm"><code>{`{
  "tool": {          // Current tool being invoked
    "id": "...",
    "type": "...",
    "endpoint": "...",
    ...
  },
  "message": {       // Current message envelope
    "from": "...",
    "to": "...",
    "payload": {...},
    "intent": "...",
    ...
  },
  "agent": {         // Current agent manifest
    "id": "...",
    "name": "...",
    ...
  },
  "runtime": {       // Runtime context
    "environment": "production",
    "timestamp": "2025-11-10T00:00:00Z",
    ...
  }
}`}</code></pre>
            </div>
          </div>

          {/* Examples */}
          <div className="mb-16">
            <h2 id="examples" className="text-3xl mb-6 text-gray-900 font-light">Examples</h2>
            
            <div className="space-y-8">
              
              {/* Example 1 */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
                  <h3 className="text-lg font-medium text-gray-900">Simple Comparison</h3>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <pre className="text-sm overflow-x-auto"><code>{`{
  "id": "deny-http-no-auth",
  "effect": "deny",
  "action": "tool.call",
  "where": "tool.type == 'http' && tool.auth.method == 'none'"
}`}</code></pre>
                  </div>
                  <p className="text-sm text-gray-700">
                    Denies calls to HTTP tools that don't have authentication configured.
                  </p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
                  <h3 className="text-lg font-medium text-gray-900">Regex Pattern Matching</h3>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <pre className="text-sm overflow-x-auto"><code>{`{
  "id": "deny-external-endpoints",
  "effect": "deny",
  "action": "tool.call",
  "where": "tool.endpoint !~ '^https://.*\\\\.internal\\\\.corp'"
}`}</code></pre>
                  </div>
                  <p className="text-sm text-gray-700">
                    Blocks access to any endpoints outside the internal corporate domain.
                  </p>
                </div>
              </div>

              {/* Example 3 */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
                  <h3 className="text-lg font-medium text-gray-900">Complex Logic</h3>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <pre className="text-sm overflow-x-auto"><code>{`{
  "id": "audit-sensitive-messages",
  "effect": "audit",
  "action": "message.send",
  "where": "(message.payload contains 'password' || message.payload contains 'api_key') && not (message.to starts_with 'ajson://internal')"
}`}</code></pre>
                  </div>
                  <p className="text-sm text-gray-700">
                    Audits messages containing sensitive keywords being sent to external agents.
                  </p>
                </div>
              </div>

              {/* Example 4 */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
                  <h3 className="text-lg font-medium text-gray-900">Collection Membership</h3>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <pre className="text-sm overflow-x-auto"><code>{`{
  "id": "allow-safe-tools",
  "effect": "allow",
  "action": "tool.call",
  "where": "tool.type in ['function', 'http'] && tool.id in ['tool://safe/search', 'tool://safe/summarize']"
}`}</code></pre>
                  </div>
                  <p className="text-sm text-gray-700">
                    Allows only specific whitelisted tools of approved types.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Evaluation Semantics */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <AlertCircle className="text-slate-800" size={32} />
              <h2 id="evaluation-semantics" className="text-3xl text-gray-900 font-light">Evaluation Semantics</h2>
            </div>
            
            <div className="space-y-6">
              
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Type Coercion</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>Comparisons between incompatible types evaluate to <code className="bg-gray-100 px-1 rounded">false</code></li>
                  <li>String comparisons are case-sensitive</li>
                  <li>Numbers are compared numerically</li>
                  <li>Booleans compare by value (<code className="bg-gray-100 px-1 rounded">true</code> &gt; <code className="bg-gray-100 px-1 rounded">false</code>)</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Missing Fields</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>Accessing non-existent fields returns <code className="bg-gray-100 px-1 rounded">null</code></li>
                  <li><code className="bg-gray-100 px-1 rounded">null == null</code> evaluates to <code className="bg-gray-100 px-1 rounded">true</code></li>
                  <li><code className="bg-gray-100 px-1 rounded">null</code> compared to any non-null value evaluates to <code className="bg-gray-100 px-1 rounded">false</code></li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Short-Circuit Evaluation</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><code className="bg-gray-100 px-1 rounded">&amp;&amp;</code>: If left operand is <code className="bg-gray-100 px-1 rounded">false</code>, right operand is not evaluated</li>
                  <li><code className="bg-gray-100 px-1 rounded">||</code>: If left operand is <code className="bg-gray-100 px-1 rounded">true</code>, right operand is not evaluated</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Implementation Guidance */}
          <div className="mb-16">
            <h2 id="implementation-guidance" className="text-3xl mb-6 text-gray-900 font-light">Implementation Guidance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Security</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>MUST NOT execute arbitrary code</li>
                  <li>MUST limit recursion depth (recommended: 10 levels)</li>
                  <li>MUST prevent regex denial-of-service (ReDoS)</li>
                  <li>SHOULD implement expression complexity limits</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Performance</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>Evaluate in constant or linear time when possible</li>
                  <li>Cache compiled expressions</li>
                  <li>Optimize common patterns (e.g., simple equality)</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Error Handling</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>Syntax errors SHOULD fail policy evaluation (fail-closed)</li>
                  <li>Runtime errors MAY log warnings</li>
                  <li>Invalid regex patterns MUST fail at compile time</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Future Extensions</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>Functions: <code className="bg-gray-100 px-1 rounded text-xs">length()</code>, <code className="bg-gray-100 px-1 rounded text-xs">upper()</code>, <code className="bg-gray-100 px-1 rounded text-xs">lower()</code></li>
                  <li>Array operations: <code className="bg-gray-100 px-1 rounded text-xs">map()</code>, <code className="bg-gray-100 px-1 rounded text-xs">filter()</code></li>
                  <li>Temporal operators: <code className="bg-gray-100 px-1 rounded text-xs">before</code>, <code className="bg-gray-100 px-1 rounded text-xs">after</code></li>
                  <li>Quantifiers: <code className="bg-gray-100 px-1 rounded text-xs">exists</code>, <code className="bg-gray-100 px-1 rounded text-xs">forall</code></li>
                </ul>
              </div>

            </div>
          </div>

          {/* CTA */}
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl mb-4 text-gray-900 font-light">Learn More</h2>
            <p className="text-gray-700 mb-6">
              Read the complete policy expression language specification in Appendix B
            </p>
            <a
              href="/Standard/json-agents.md#appendix-b-policy-expression-language"
              className="px-6 py-3 bg-slate-800 text-white text-sm font-medium rounded hover:bg-slate-700 transition"
            >
              View Full Specification
            </a>
          </div>

          {/* Quick Links */}
          <QuickLinks
            links={[
              {
                title: "Full Specification",
                href: "/spec",
                description: "Read the complete JSON Agents specification including the Gov profile with policy definitions"
              },
              {
                title: "Implementer's Guide",
                href: "/implementers-guide",
                description: "Learn how to implement and evaluate policy expressions in your agent runtime environment"
              },
              {
                title: "Gov Profile Examples",
                href: "/examples",
                description: "Explore governance profile examples with real-world policy rules and access control patterns"
              },
              {
                title: "Getting Started",
                href: "/getting-started",
                description: "Quick introduction to JSON Agents including basic policy configuration examples"
              }
            ]}
          />

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
