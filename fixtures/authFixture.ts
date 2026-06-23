import { test as base, expect } from '@playwright/test';
import fs from 'fs';

type AuthFixture = {
  authHeaders: {
    Authorization: string;
  };
};

export const test = base.extend<AuthFixture>({
  authHeaders: async ({}, use) => {
    const data = JSON.parse(
      fs.readFileSync('./auth/token.json', 'utf-8')
    );

    await use({
      Authorization: `Bearer ${data.token}`,
    });
  },
});

export { expect };