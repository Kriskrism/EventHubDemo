import fs from 'fs';
import { request } from '@playwright/test';

async function globalSetup() {

    const apiContext = await request.newContext({
        baseURL: process.env.API_BASE_URL
    });

    const response = await apiContext.post('api/auth/login', {
        data: {
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        }
    });

    const responseBody = await response.json();

    const tokenData = {
        accessToken: responseBody.accessToken
    };

    fs.writeFileSync(
        'auth/token.json',
        JSON.stringify(tokenData, null, 2)
    );

    await apiContext.dispose();
}

export default globalSetup;