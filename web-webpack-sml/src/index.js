import posthog from 'posthog-js';

// Nothing here needs to run — the reproduction is entirely at build time. Importing the
// SDK is enough to route dist/module.js through source-map-loader.
posthog.init('phc_dummy', { api_host: 'http://localhost:8010' });
