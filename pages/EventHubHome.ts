import { Locator, LocatorScreenshotOptions, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import testData from '../resources/testData.json'

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
    myBookingsLink : Locator
   

    constructor(page : Page){
        this.page = page;
        this. logOutBtn = page.getByTestId('logout-btn');
        this.loggedInUser = page.getByTestId('user-email-display');
        this.homeLink = page.getByRole('link', {name:'Home'})
        this.eventsLink = page.getByRole('link', {name:'Events'})
        this.myBookingsLink = page.getByRole('link', {name:'My Bookings'})
        this.apiDocsLink = page.getByRole('link', {name:'API Docs'})
        this.adminLink = page.getByRole('link', {name:'Admin'})
        this.browseEventsLink = page.getByRole('link', {name:'Browse Events'})
        this.myBookingsLink = page.getByRole('link', {name:'My Bookings'})
    }

    async verifyLogInSuccess(){
        await this.logOutBtn.isVisible();
        await expect(this.loggedInUser).toHaveText(testData.Email);
    }

    async navigateBrowseEvents(){

    }


}