import fs from 'fs';
import path from 'path';

const TOKEN_PATH = path.resolve(__dirname, '../utilities/apiTestData/token.json');

/**
 * Reads the auth token written by global.setup.ts.
 * Throws a clear error if the token file is missing, instead of a
 * confusing "Cannot read property 'token' of undefined" downstream.
 */
export function getAuthToken(): string {
    if (!fs.existsSync(TOKEN_PATH)) {
        throw new Error(
            `Auth token file not found at ${TOKEN_PATH}. Did global setup run? Try: npx playwright test (global setup runs automatically).`
        );
    }

    const { token } = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));

    if (!token) {
        throw new Error(`Auth token file at ${TOKEN_PATH} exists but has no "token" field.`);
    }

    return token;
}