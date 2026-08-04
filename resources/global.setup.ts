import fs from 'fs';
import path from 'path';
import { request } from '@playwright/test';

async function globalSetup() {

    const apiContext = await request.newContext({
        baseURL: process.env.API_BASE_URL
    });

    const response = await apiContext.post('api/auth/login', {
        data: {
            email: process.env.TEST_USERNAME,
            password: process.env.TEST_PASSWORD
        }
    });

    if (!response.ok()) {
        throw new Error(
            `Global setup login failed with status ${response.status()}. Check EMAIL/PASSWORD/API_BASE_URL in your .env file.`
        );
    }

    const responseBody = await response.json();

    // Handles either field name the login API might return
    const tokenData = {
        token: responseBody.token ?? responseBody.accessToken
    };

    const tokenPath = path.resolve(__dirname, 'utilities/apiTestData/token.json');
    fs.mkdirSync(path.dirname(tokenPath), { recursive: true });
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));

    await apiContext.dispose();
}

export default globalSetup;