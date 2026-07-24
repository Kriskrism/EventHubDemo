import { test as base } from '@playwright/test';

// Currently just re-exports base test/expect for consistency across specs.
// Add fixtures here only when a spec actually needs them.
export const test = base;
export { expect } from '@playwright/test';