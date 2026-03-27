import { test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { SigninPage } from "../pages/SignInPage";
import testData from '../resources/testData.json'

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
        await registerPage.registerAccount(testData.Email, testData.Password);
        await signInPage.validateSignInPageTitle();
    })
})