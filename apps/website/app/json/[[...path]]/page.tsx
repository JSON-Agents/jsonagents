import JsonViewerClient from './JsonViewerClient';

interface PageProps {
  params: Promise<{ path?: string[] }>;
}

// Generate static params for the catch-all route
export async function generateStaticParams() {
  return [
    { path: ['schema', 'json-agents.json'] },
  ];
}

export default async function JsonViewerPage({ params }: PageProps) {
  const resolvedParams = await params;

  return <JsonViewerClient path={resolvedParams.path} />;
}
