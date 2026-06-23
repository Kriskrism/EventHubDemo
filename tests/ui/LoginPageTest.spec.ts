import { test, expect } from '@playwright/test';
import { SigninPage } from '../../pages/SignInPage';
import testData from '../../resources/testData.json'
import { credentials } from '../../resources/config/env'

test.describe('Verify Login page elements and functionality', () => {
    let signInPage: SigninPage;

    test.beforeEach(async ({ page }) => {
        signInPage = new SigninPage(page);
    })


    test('Verify login page elements', async ({ page }) => {
        await page.goto(testData.url);
        await signInPage.validateSignInPageTitle();
    })

    test('Verify login functionality with valid credentials', async ({ page }) => {
        await page.goto(testData.url);
        await signInPage.clickSignIn(credentials.username, credentials.password);
        // Add assertions to verify successful login, e.g., checking for a specific element on the dashboard
    })
})