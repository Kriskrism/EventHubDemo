import { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

import { credentials } from '../resources/config/env'

export class EvenHubHome{
    page :Page;
    logOutBtn : Locator;
    loggedInUser : Locator;
    homeLink : Locator
    eventsLink : Locator
    myBookingsLink: Locator
    apiDocsLink:Locator
    adminLink : Locator
    browseEventsLink : Locator
  
   

    constructor(page : Page){
        this.page = page;
        this. logOutBtn = page.getByTestId('logout-btn');
        this.loggedInUser = page.getByTestId('user-email-display');
        this.homeLink = page.getByRole('link', {name:'Home'}).first()
        this.eventsLink = page.getByRole('link', {name:'Events'}).first()
        this.myBookingsLink = page.getByTestId('nav-bookings')
        this.apiDocsLink = page.getByRole('link', {name:'API Docs'}).first()
        this.adminLink = page.getByRole('link', {name:'Admin'}).first()
        this.browseEventsLink = page.getByRole('link', {name:'Browse Events'}).first()
    }

    async verifyLogInSuccess(){
        await this.logOutBtn.isVisible();
        console.log("Logged inuser" + await this.loggedInUser.textContent())
        await expect(this.loggedInUser).toHaveText(credentials.username);
    }

    async navigateBrowseEvents(){

    }


}