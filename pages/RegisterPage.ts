import { Page, Locator,expect } from "@playwright/test";

export class RegisterPage{
    readonly page:Page
    readonly titleRegister : Locator;
    readonly email: Locator;
    readonly password : Locator;
    readonly confirmPassword: Locator
    readonly createAccountBtn : Locator;
    readonly signInLink : Locator;
    readonly pwdGuidlelines : Locator

    constructor(page : Page){
        this.page = page;
        this.titleRegister = page.getByRole("heading", {name: 'Create your account'});
        this.email = page.locator('#register-email')
        this.password = page.locator('#register-password')
        this.confirmPassword = page.getByPlaceholder ('Repeat your password')
        this.createAccountBtn = page.locator('#register-btn');
        this.signInLink = page.getByRole('link', { name: 'Sign in' })
        this.pwdGuidlelines = page.getByText('At least 8 characters', { exact: true })
    }

    async registerAccount(email : string, password : string){
        
            await this.email.fill(email);
            await this.password.fill(password);
            await this.confirmPassword.fill(password);
            await this.createAccountBtn.click();
        
    }

    async verifyRegisterPageElements(){
        await expect(this.titleRegister).toBeVisible();
        await expect(this.pwdGuidlelines).toBeVisible();
    }

}