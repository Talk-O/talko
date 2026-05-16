# JavaScript / TypeScript Reference Client

This package is the private TalkO JavaScript and TypeScript reference client for backend integrations.

## Supported runtime

- Node.js 20+
- Bun 1+
- Serverless environments with standards-based `fetch`

## What is included

- Typed HTTP client
- Conversations resource wrapper
- Webhooks resource wrapper
- Connectors resource wrapper
- Workspace API keys wrapper
- Webhook signature helpers

## Local usage during customer delivery

```ts
import { TalkoClient } from './src/index';

const talko = new TalkoClient({
  apiKey: process.env.TALKO_API_KEY!,
});
```

## Examples

- `examples/node-basic.ts`
- `examples/nextjs-webhook-route.ts`
