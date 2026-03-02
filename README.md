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
