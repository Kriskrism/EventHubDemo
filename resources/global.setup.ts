import { request } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup() {

    const apiContext = await request.newContext({
        baseURL: process.env.API_BASE_URL
    });

    const response = await apiContext.post('/api/auth//login', {
        data: {
            email: process.env.TEST_USERNAME,
            password: process.env.TEST_PASSWORD
        }
    });

    const body = await response.json();

    const token = body.token; 
    
    const tokenPath = path.resolve(
    process.cwd(),
    'resources/utilities/apiTestData/token.json'
);

fs.mkdirSync(path.dirname(tokenPath), { recursive: true });

//token is written to the file
fs.writeFileSync(tokenPath, JSON.stringify({ token }));
console.log("TOKEN GENERATED:", token);
}

export default globalSetup;