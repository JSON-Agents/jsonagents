'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import JsonViewer from '@/components/JsonViewer';
import { Github } from 'lucide-react';

interface PageProps {
  params: Promise<{ path?: string[] }>;
}

// Use the Edge runtime for this dynamic route so Cloudflare Pages / next-on-pages
// can build the project. This route is a client component but Next.js requires
// non-static routes to opt into a runtime when deploying to edge hosts.
export const runtime = 'edge';

export default function JsonViewerPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ path?: string[] } | null>(null);
  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const filePath = resolvedParams?.path?.join('/') || 'schema/json-agents.json';
  const fileName = filePath.split('/').pop() || 'json-agents.json';
  const fileTitle = fileName.replace('.json', '').split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  useEffect(() => {
    if (!resolvedParams) return;

    const fetchJson = async () => {
      try {
        setLoading(true);

        // Check if the path has a .json extension
        if (!filePath.endsWith('.json')) {
          throw new Error('Invalid path. Please specify a complete JSON file path (e.g., schema/json-agents.json)');
        }

        const response = await fetch(`/Standard/${filePath}`);

        if (!response.ok) {
          throw new Error(`Failed to load ${fileName}. The file may not exist at /Standard/${filePath}`);
        }

        const data = await response.json();
        setJsonData(data);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load JSON file');
        setJsonData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJson();
  }, [filePath, fileName, resolvedParams]);

  if (!resolvedParams) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Get breadcrumb parts
  const pathParts = filePath.split('/');
  const breadcrumbs = pathParts.map((part, index) => {
    const path = pathParts.slice(0, index + 1).join('/');
    const isLast = index === pathParts.length - 1;
    return { name: part, path, isLast };
  });

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

      {/* Breadcrumb */}
      <div className="bg-gray-200 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="text-gray-500">/</span>
            <Link href="/schema" className="text-gray-600 hover:text-gray-900">Schema</Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-gray-500">/</span>
                {crumb.isLast ? (
                  <span className="text-gray-900 font-medium">{crumb.name}</span>
                ) : (
                  <span className="text-gray-600">{crumb.name}</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-light tracking-tight text-slate-900" style={{ fontFamily: 'Momo Trust Display, serif' }}>
            {fileTitle}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Interactive JSON viewer for {fileName}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
            <p className="mt-4 text-gray-600">Loading JSON...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-red-900 mb-1">Error Loading JSON</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && jsonData && (
          <>
            {/* Download Button */}
            <div className="mb-8 flex justify-end">
              <a
                href={`/Standard/${filePath}`}
                download={fileName}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-slate-800 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Download JSON
              </a>
            </div>

            {/* JSON Viewer */}
            <div className="mb-12">
              <h2 className="text-2xl font-light text-slate-900 mb-4" style={{ fontFamily: 'Momo Trust Display, serif' }}>
                JSON Content
              </h2>
              <JsonViewer data={jsonData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
