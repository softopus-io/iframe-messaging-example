export interface OriginEntry {
  name: string;
  origin: string;
  enabled: boolean;
}

// Add or remove entries here to control which origins are permitted.
// Set enabled: false to block a specific environment without deleting the entry.
export const allowedOrigins: OriginEntry[] = [
  { name: "development", origin: "http://localhost:5173", enabled: true },
  { name: "staging", origin: "https://staging.example.com", enabled: false },
  { name: "production", origin: "https://example.com", enabled: false },
  {
    name: "github-pages",
    origin: "https://softopus-io.github.io",
    enabled: true,
  },
];

export function getEnabledOrigins(): string[] {
  return allowedOrigins.filter((e) => e.enabled).map((e) => e.origin);
}
