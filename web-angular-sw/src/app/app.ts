import { Component, inject, signal } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import posthog from 'posthog-js';
import { BUILD } from '../build';

// Two frames deep so the captured stack has something to symbolicate.
function explode(build: string): never {
  throw new Error(`web-angular-sw exploded (build ${build})`);
}

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly build = BUILD;
  // Mirrors the service worker's version lifecycle so a browser test (or a
  // human) can read from the DOM whether the deployed version was accepted.
  protected readonly swStatus = signal('not registered');

  constructor() {
    const updates = inject(SwUpdate);
    if (!updates.isEnabled) return;
    this.swStatus.set('registered');
    // Lets test-browser.mjs ask the service worker to check for a new version
    // on demand instead of waiting for its own schedule.
    (globalThis as any).__checkForUpdate = () => updates.checkForUpdate();
    updates.versionUpdates.subscribe((event: VersionEvent) => {
      this.swStatus.set(event.type);
      if (event.type === 'VERSION_INSTALLATION_FAILED') {
        console.error('service worker rejected the new version', event.error);
      }
    });
  }

  throwError() {
    try {
      explode(this.build);
    } catch (error) {
      posthog.captureException(error);
    }
  }
}
