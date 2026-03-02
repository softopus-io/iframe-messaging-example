# iframe Messaging Example

A minimal TypeScript example demonstrating two-way communication between a parent page and an embedded iframe using `postMessage`.

## What it shows

- **Iframe → Parent**: iframe sends its own height (via `ResizeObserver`) and mock API data (`lastModifiedDate`) to the parent
- **Parent**: displays both values in a panel above the iframe and resizes the iframe element to fit its content

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to see the parent page with the embedded iframe.

## Origin allow-list

Allowed origins are configured in **`src/config.ts`**:

```ts
export const allowedOrigins: OriginEntry[] = [
  { name: "development", origin: "http://localhost:5173", enabled: true  },
  { name: "staging",     origin: "https://staging.example.com", enabled: false },
  { name: "production",  origin: "https://example.com", enabled: false },
];
```

- Set `enabled: false` to block an environment without removing its entry.
- Both sides (parent and iframe) read the same list — disabling an entry prevents the iframe from sending and the parent from accepting messages for that origin.
- The parent logs `console.error` for messages from unlisted origins and `console.warn` for messages with an unexpected shape.
