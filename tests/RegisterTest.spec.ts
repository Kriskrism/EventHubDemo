import { test } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { RegisterPage } from "../pages/RegisterPage";
import { SigninPage } from "../pages/SignInPage";
import testData from '../resources/testData.json'
import { credentials } from '../resources/config/env'

test.describe('Register Page Tests', () => {
    let registerPage: RegisterPage
    let signInPage: SigninPage

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        signInPage = new SigninPage(page);
        await page.goto(testData.registerUrl);
        //await signInPage.registerLink.click();
    })

    test('Verify register page elements', async () => {
        await registerPage.verifyRegisterPageElements();
    })

    test('Regsiter a new account', async () => {
        await registerPage.registerAccount(faker.internet.email(), 'Test@123');
    })
    //getvthe data here from faker and update teh latest value in .env file and then use that email to login and verify the login is successful
})