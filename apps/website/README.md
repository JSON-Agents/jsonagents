# @json-agents/website

Official documentation website for JSON Agents specification - part of the JSON Agents Turborepo monorepo.

## About

Next.js 16 documentation website that serves the JSON Agents specification, examples, and schema files. Content is loaded dynamically from the monorepo root via symlink in `public/Standard/`.

## Development

This package is part of the Turborepo monorepo. Run commands from the **repository root**:

```bash
# Install all dependencies
npm install

# Start website in development mode
npm run dev --filter=@json-agents/website

# Or start all workspaces
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Build

```bash
# Build website only
npm run build --filter=@json-agents/website

# Build all packages
npm run build
```

## Features

- **Dynamic Markdown Rendering** - Loads spec files at runtime
- **Syntax Highlighting** - Code examples with highlight.js
- **Responsive Design** - Tailwind CSS responsive layout
- **Edge Runtime** - Dynamic JSON file serving
- **Symlinked Content** - No duplicate spec files

## Architecture

```
apps/website/
├── app/                    # Next.js 16 app directory
│   ├── spec/              # Spec viewer pages
│   ├── schema/            # Schema viewer pages
│   ├── examples/          # Examples pages
│   └── json/[[...path]]/ # Dynamic JSON API
├── components/            # React components
├── public/
│   ├── Standard/         # Symlink to ../../.. (root)
│   └── images/           # Website-specific images
└── package.json
```

## Deployment

### Cloudflare Pages

Build Configuration:
- Framework: Next.js
- Build command: `npx @cloudflare/next-on-pages@1`
- Build output: `.vercel/output/static`
- Node version: 18+
- Compatibility flag: `nodejs_compat`

See `wrangler.toml` for configuration.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown + remark/rehype
- **Icons**: lucide-react
- **Language**: TypeScript

## License

Apache 2.0 - See LICENSE in repository root
