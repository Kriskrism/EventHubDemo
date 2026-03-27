import {Page, test, expect} from '@playwright/test';
import { EvenHubHome } from '../pages/EventHubHome';
import { SigninPage } from '../pages/SignInPage';
import testData from '../resources/testData.json'

test.describe('Register Page Tests', () => {
    
    let signInPage: SigninPage

    test.beforeEach(async ({ page }) => {
        
        signInPage = new SigninPage(page);
        await page.goto(testData.url);
        
    })


test("Verify successful login", async ({page}) => {
    await signInPage.clickSignIn(testData.Email, testData.Password);
    const evenHubHome = new EvenHubHome(page);
    await evenHubHome.verifyLogInSuccess();



})

})


