import {Page, Locator, expect} from '@playwright/test';

export class SigninPage {
    readonly page:Page
    readonly email : Locator;
    readonly password : Locator;
    readonly signInButton : Locator;
    readonly registerLink : Locator;
    readonly signInTitle : Locator;
    readonly validationMessage : Locator


    constructor(page: Page){
        this.page = page;
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.signInButton= page.locator('#login-btn')
        this.registerLink = page.getByRole('link', { name: 'Register' })
        this.signInTitle = page.getByRole('heading', { name: 'Sign in to EventHub' })
        this.validationMessage = page.getByText('Invalid email or password', { exact: true })
}

async validateSignInPageTitle(){
    await this.signInTitle.isVisible();
}

async clickSignIn(email: string, password: string){
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
}

async validateInvalidLogin(){
    await expect(this.validationMessage).toBeVisible();
}

}