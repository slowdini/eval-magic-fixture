import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

const testEnvironment = globalThis as typeof globalThis & {
  jsdom?: { window: Window }
}

// Node exposes web-storage globals that Vitest preserves instead of replacing
// with jsdom's implementations. Bind tests to the active browser-like window.
if (testEnvironment.jsdom) {
  for (const key of ['localStorage', 'sessionStorage'] as const) {
    Object.defineProperty(globalThis, key, {
      configurable: true,
      value: testEnvironment.jsdom.window[key],
    })
  }
}

afterEach(cleanup)
