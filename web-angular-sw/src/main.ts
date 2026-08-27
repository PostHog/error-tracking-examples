import { bootstrapApplication } from '@angular/platform-browser';
import posthog from 'posthog-js';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Hardcoded local-dev project token, same as web-raw. The .env credentials are
// only used by posthog-cli at build time.
posthog.init('e2e_token_1239', {
  api_host: 'http://localhost:8010',
  request_batching: false,
  debug: true,
});

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
