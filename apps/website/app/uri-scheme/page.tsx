"use client";

import { useState, useEffect } from "react";
import { Github, Link2, Server, Shield, Globe } from "lucide-react";
import QuickLinks from "../components/QuickLinks";
import Breadcrumbs from "../components/Breadcrumbs";

export default function UriSchemePage() {
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
    { id: "syntax", title: "Syntax" },
    { id: "identifier-construction", title: "Identifier Construction" },
    { id: "resolution-mechanism", title: "Resolution Mechanism" },
    { id: "resolution-algorithm", title: "Resolution Algorithm" },
    { id: "error-handling", title: "Error Handling" },
    { id: "registry-service", title: "Registry Service" },
    { id: "versioning-and-immutability", title: "Versioning and Immutability" },
    { id: "security-considerations", title: "Security Considerations" },
    { id: "iana-considerations", title: "IANA Considerations" }
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
        { label: "URI Scheme" }
      ]} />

      {/* Hero */}
      <section className="bg-gray-200 py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 400 }}>
            URI Scheme: ajson://
          </h1>
          <p className="text-xl text-gray-700">
            Standardized method for uniquely identifying and referencing JSON Agents manifests
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
              <Link2 className="text-slate-800" size={32} />
              <h2 id="purpose" className="text-3xl text-gray-900 font-light">Purpose</h2>
            </div>
            <p className="text-gray-700 text-lg mb-4">
              The <code className="bg-gray-100 px-2 py-1 rounded">ajson://</code> URI scheme provides a standardized 
              method for uniquely identifying and referencing agent manifests, capabilities, and other JSON Agents resources.
            </p>
          </div>

          {/* Syntax */}
          <div className="mb-16">
            <h2 id="syntax" className="text-3xl mb-6 text-gray-900 font-light">Syntax</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto"><code>{`ajson-uri = "ajson://" authority path [ "?" query ] [ "#" fragment ]

authority = [ userinfo "@" ] host [ ":" port ]
path      = "/" segment *( "/" segment )
segment   = *pchar`}</code></pre>
            </div>

            <h3 className="text-xl font-medium text-gray-900 mb-4">Examples</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-50 p-4 rounded"><code>ajson://jsonagents.org/examples/router-hub</code></div>
              <div className="bg-gray-50 p-4 rounded"><code>ajson://example.com/agents/summarizer/v2.1.0</code></div>
              <div className="bg-gray-50 p-4 rounded"><code>ajson://registry.internal/capabilities/routing</code></div>
              <div className="bg-gray-50 p-4 rounded"><code>ajson://localhost:8080/test/agent#metadata</code></div>
            </div>
          </div>

          {/* Identifier Construction */}
          <div className="mb-16">
            <h2 id="identifier-construction" className="text-3xl mb-6 text-gray-900 font-light">Identifier Construction</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Authority Component</h3>
                <p className="text-sm text-gray-700 mb-3">The authority SHOULD represent:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>DNS domain under publisher's control</li>
                  <li>Well-known registry service</li>
                  <li><code className="bg-gray-100 px-1 rounded">localhost</code> for development</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Path Component</h3>
                <p className="text-sm text-gray-700 mb-3">The path MUST:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Begin with forward slash (<code className="bg-gray-100 px-1 rounded">/</code>)</li>
                  <li>Uniquely identify the resource</li>
                  <li>Use URL-safe characters</li>
                </ul>
                <p className="text-sm text-gray-700 mt-3">MAY include:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Organizational hierarchy</li>
                  <li>Version information</li>
                  <li>Resource type indicators</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Fragment Component</h3>
                <p className="text-sm text-gray-700 mb-3">The fragment MAY reference:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Specific manifest sections</li>
                  <li>Individual capabilities</li>
                  <li>Graph nodes</li>
                </ul>
                <div className="mt-3 bg-gray-50 p-2 rounded text-xs">
                  <div><code>#runtime</code></div>
                  <div><code>#capability/summarization</code></div>
                  <div><code>#node/router</code></div>
                </div>
              </div>

            </div>
          </div>

          {/* Resolution Mechanism */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <Globe className="text-slate-800" size={32} />
              <h2 id="resolution-mechanism" className="text-3xl text-gray-900 font-light">Resolution Mechanism</h2>
            </div>
            
            <p className="text-gray-700 mb-6">
              Implementations SHOULD resolve <code className="bg-gray-100 px-2 py-1 rounded">ajson://</code> URIs 
              through one of the following methods:
            </p>

            <div className="space-y-6">
              
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">1. HTTPS Transformation (Recommended)</h3>
                <div className="bg-gray-50 p-4 rounded text-sm mb-3">
                  <div className="mb-2 text-gray-600">Transform ajson:// to well-known HTTPS path:</div>
                  <div className="space-y-1">
                    <div><code>ajson://example.com/agents/router</code></div>
                    <div className="text-gray-500">becomes</div>
                    <div><code>https://example.com/.well-known/agents/router.agents.json</code></div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">2. Direct Registry Lookup</h3>
                <p className="text-sm text-gray-700">
                  Query a configured registry service using the full URI as an identifier.
                </p>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">3. Local Cache</h3>
                <p className="text-sm text-gray-700">
                  Check local manifest cache before attempting network resolution.
                </p>
              </div>

            </div>
          </div>

          {/* Resolution Algorithm */}
          <div className="mb-16">
            <h2 id="resolution-algorithm" className="text-3xl mb-6 text-gray-900 font-light">Resolution Algorithm</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <pre className="text-sm overflow-x-auto"><code>{`function resolve(ajsonURI):
  1. Parse URI into components (authority, path, fragment)
  2. Check local cache for authority + path
  3. If cached and not expired, return cached manifest
  4. Transform to HTTPS well-known URI
  5. Perform HTTP GET with Accept: application/agents+json
  6. Validate response against json-agents.json schema
  7. Cache response if valid
  8. If fragment present, extract referenced component
  9. Return resolved manifest or component`}</code></pre>
            </div>
          </div>

          {/* Error Handling */}
          <div className="mb-16">
            <h2 id="error-handling" className="text-3xl mb-6 text-gray-900 font-light">Error Handling</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Condition</th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900">Behavior</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Network unavailable</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Use cached version if available, otherwise fail</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">404 Not Found</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Return resolution error with original URI</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Invalid manifest</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Return validation error with details</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Timeout</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Retry with exponential backoff, max 3 attempts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Registry Service */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <Server className="text-slate-800" size={32} />
              <h2 id="registry-service" className="text-3xl text-gray-900 font-light">Registry Service</h2>
            </div>
            
            <p className="text-gray-700 mb-6">A conformant registry service MUST:</p>
            
            <ul className="space-y-3 mb-6">
              <li className="text-gray-700">Accept <code className="bg-gray-100 px-2 py-1 rounded">ajson://</code> URIs as identifiers</li>
              <li className="text-gray-700">Store and serve valid JSON Agents manifests</li>
              <li className="text-gray-700">Implement versioning for manifest updates</li>
              <li className="text-gray-700">Provide discovery endpoints for browsing</li>
              <li className="text-gray-700">Support content negotiation (JSON/YAML)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-4">Example Registry API</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <pre className="text-sm overflow-x-auto"><code>{`GET /resolve?uri=ajson://example.com/agents/router
Accept: application/agents+json

Response:
200 OK
Content-Type: application/agents+json
{
  "manifest_version": "1.0",
  ...
}`}</code></pre>
            </div>
          </div>

          {/* Versioning */}
          <div className="mb-16">
            <h2 id="versioning-and-immutability" className="text-3xl mb-6 text-gray-900 font-light">Versioning and Immutability</h2>
            
            <p className="text-gray-700 mb-6">URIs MAY encode version information:</p>
            
            <div className="space-y-3 mb-6">
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Immutable</div>
                    <code className="text-sm bg-gray-50 px-2 py-1 rounded">ajson://example.com/agent/v1.2.3</code>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded">Exact version</span>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Mutable</div>
                    <code className="text-sm bg-gray-50 px-2 py-1 rounded">ajson://example.com/agent</code>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Latest version</span>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Major</div>
                    <code className="text-sm bg-gray-50 px-2 py-1 rounded">ajson://example.com/agent/v1</code>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded">Latest v1.x.x</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-sm text-blue-900">
                <strong>Recommendation:</strong> For production deployments, manifests SHOULD reference 
                immutable versioned URIs to ensure reproducibility.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="text-slate-800" size={32} />
              <h2 id="security-considerations" className="text-3xl text-gray-900 font-light">Security Considerations</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Transport Security</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>All resolution MUST use TLS 1.2+</li>
                  <li>Certificate validation MUST be performed</li>
                  <li>HTTPS redirects MUST NOT downgrade to HTTP</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Manifest Integrity</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>Verify manifest signatures if present</li>
                  <li>Validate Content-Type header</li>
                  <li>Reject manifests with invalid schemas</li>
                  <li>Implement Content Security Policy</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">URI Validation</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>Validate URI syntax before resolution</li>
                  <li>Reject URIs with embedded credentials</li>
                  <li>Sanitize path components</li>
                  <li>Implement rate limiting</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Cache Poisoning Prevention</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>Use cryptographic hashes for cache keys</li>
                  <li>Validate cache-control headers</li>
                  <li>Provide cache invalidation mechanisms</li>
                  <li>Log resolution attempts for audits</li>
                </ul>
              </div>

            </div>
          </div>

          {/* IANA */}
          <div className="mb-16">
            <h2 id="iana-considerations" className="text-3xl mb-6 text-gray-900 font-light">IANA Considerations</h2>
            
            <p className="text-gray-700 mb-6">
              The <code className="bg-gray-100 px-2 py-1 rounded">ajson://</code> URI scheme is intended 
              for registration with IANA under the Uniform Resource Identifier (URI) Schemes registry.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-gray-900 w-48">Scheme Name:</td>
                    <td className="py-2 text-gray-700">ajson</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-gray-900">Status:</td>
                    <td className="py-2 text-gray-700">Provisional</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-gray-900">Applications/Protocols:</td>
                    <td className="py-2 text-gray-700">JSON Agents Portable Agent Manifest</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-gray-900">Contact:</td>
                    <td className="py-2 text-gray-700">JSON Agents Working Group</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-gray-900">Change Controller:</td>
                    <td className="py-2 text-gray-700">JSON Agents Steering Committee</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl mb-4 text-gray-900 font-light">Learn More</h2>
            <p className="text-gray-700 mb-6">
              Read the complete URI scheme specification in Section 16
            </p>
            <a
              href="/Standard/json-agents.md#16-uri-scheme-definition"
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
                description: "Complete normative specification including URI scheme definition, resolution algorithm, and IANA registration"
              },
              {
                title: "Implementer's Guide",
                href: "/implementers-guide",
                description: "Learn how to implement ajson:// URI resolution, caching, and registry integration in your runtime"
              },
              {
                title: "Getting Started",
                href: "/getting-started",
                description: "Quick introduction to JSON Agents with examples using ajson:// URIs for agent identification"
              },
              {
                title: "Schema Reference",
                href: "/schema",
                description: "Browse the JSON Schema definitions showing how URIs are used in agent manifests and capabilities"
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
