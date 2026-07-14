import { test as base, request, APIRequestContext } from '@playwright/test';
import fs from 'fs';

type ApiFixtures = {
    apiContext: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({

    apiContext: async (_fixtures, use) => {

        const tokenData = JSON.parse(
            fs.readFileSync('auth/token.json', 'utf-8')
        );

        const apiContext = await request.newContext({
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                Authorization: `Bearer ${tokenData.accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        await use(apiContext);

        await apiContext.dispose();
    }

});

export { expect } from '@playwright/test';