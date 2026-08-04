import {Page, Locator} from '@playwright/test';
import { expect } from '@playwright/test';

export class BookEventPage{

    readonly page : Page;
    readonly bookTicketsTitle : Locator;
    readonly ticketsIncreaseBtn: Locator;
    readonly ticketsDecreaseBtn: Locator;
    readonly ticketCount : Locator
    readonly fullName : Locator;
    readonly email : Locator;
    readonly phoneNumber : Locator;
    readonly totalBreakDown : Locator;
    readonly totalAmount : Locator;
    readonly confirmBookingBtn : Locator;
    readonly eventTime : Locator;
    readonly eventDate : Locator;
    readonly eventVenue : Locator;
    readonly eventCity : Locator;
    readonly availableSeats : Locator;
    readonly pricePerTicket : Locator;
    readonly bookingConfirmedText : Locator;
    readonly bookingCustomerName : Locator;
    readonly bookingTicketCount : Locator;
    readonly bookingTotalAmount : Locator
    readonly ViewMyBookingsBtn : Locator;
    readonly browseMoreEventsLink : Locator;
    readonly bookingReferenceNumber : Locator;
    readonly bookedTicketPrice : Locator;
   

    constructor(page: Page){
        this.page = page;
        this.bookTicketsTitle = page.getByRole('heading', {name:'Book Tickets'})
        this.ticketsIncreaseBtn=page.getByRole('button', { name: '+' })
        this.ticketsDecreaseBtn=page.getByRole('button', { name: '-' })
        this.ticketCount= page.locator('#ticket-count')
        this.fullName = page.locator('#customerName')
        this.email = page.locator('#customer-email')
        this.phoneNumber = page.locator('#phone')
        this.totalAmount =  page.locator("//span[contains(text(),'Total')]//following-sibling::span")
        this.totalBreakDown = page.locator("//span[contains(text(),'Total')]//parent::div//preceding-sibling::div")
        this.confirmBookingBtn =  page.getByRole('button', {name:"Confirm Booking"})
        this.eventTime= page.locator("//p[contains(text(),'Time')]//following-sibling::p")
        this.eventDate = page.locator("//p[contains(text(),'Date')]//following-sibling::p")
        this.eventVenue = page.locator("//p[contains(text(),'Venue')]//following-sibling::p")
        this.eventCity = page.locator("//p[contains(text(),'City')]//following-sibling::p")
        this.availableSeats = page.locator("//p[contains(text(),'Available')]//following-sibling::p")
        this.pricePerTicket = page.locator("//p[contains(text(),'Price per ticket')]//following-sibling::p")
        this.bookingConfirmedText =  page.getByRole("heading", {name :'Booking Confirmed!'})
        this.bookingReferenceNumber = page.locator("//span[contains(text(),'Booking Ref')]//following-sibling::span//span")
        this.bookingCustomerName=page.locator("//span[contains(text(),'Customer')]//following-sibling::span")
        this.bookingTicketCount = page.locator("//span[contains(text(),'Tickets')]//following-sibling::span");
        this.bookingTotalAmount = page.locator("//span[contains(text(),'Total')]//following-sibling::span");
        this.ViewMyBookingsBtn = page.getByRole('button',{name:'View My Bookings'})
        this.browseMoreEventsLink = page.getByRole('button', {name:'Browse More Events'})
        this.bookedTicketPrice = page.locator("//h2[contains(text(),'Book Tickets')]//following-sibling::span")



}

 async verifyEventDetails(eventName: string,eventTime: string, eventDate: string, eventVenue: string, eventCity: string, availableSeats: number, pricePerTicket: number){
    const eventNameLocator = this.page.getByRole('heading', {name: `${eventName}`});
    const eventNameText = await eventNameLocator.textContent();
    await expect(eventNameText).toBe(eventName);
    await expect(await(this.eventTime.textContent())).toBe(eventTime)
    await expect(await(this.eventDate.textContent())).toBe(eventDate)
    await expect(await(this.eventVenue.textContent())).toBe(eventVenue)
    await expect(await(this.eventCity.textContent())).toBe(eventCity)
    await expect(this.availableSeats).toBeVisible()
    await expect((await this.pricePerTicket.textContent())?.substring(1)).toBe(pricePerTicket.toString())}

async bookTickets(fullName: string, email: string, phoneNumber: string, ticketCount: number){
    await this.fullName.fill(fullName);
    await this.email.fill(email);
    await this.phoneNumber.fill(phoneNumber);
    console.log(`Ticket number: ${ticketCount}`);

    //select the number of tickets
    if (ticketCount > 1) {
        for (let i = 1; i < ticketCount; i++) {
            await this.ticketsIncreaseBtn.click();
            console.log(`Increased ticket count to ${i + 1}`);
        }
    } else {
        console.log(`Selected 1 ticket`);
    }

    await expect(this.totalBreakDown).toContainText(`$${ticketCount * parseInt((await this.pricePerTicket.textContent() || '0').replace(/\D/g, ''), 10)}`)
    await expect(this.totalAmount).toContainText(`$${ticketCount * parseInt((await this.pricePerTicket.textContent() || '0').replace(/\D/g, ''), 10)}`)

    await this.confirmBookingBtn.click();
}

async verifyBookingConfirmed(customerName : string, ticketCount : number){
    await expect(this.bookingConfirmedText).toBeVisible();
    await expect(this.bookingReferenceNumber).toBeVisible();
    await expect(await this.bookingCustomerName.textContent()).toBe(customerName);
    await expect(await this.bookingTicketCount.textContent()).toBe(ticketCount.toString());
    await expect(await this.bookingTotalAmount.textContent()).toBe(`$${ticketCount * parseInt((await this.pricePerTicket.textContent() || '0').replace(/\D/g, ''), 10)}`);
    return(await this.bookingReferenceNumber.textContent());;
}

async navigateToViewBookings(){
    await this.ViewMyBookingsBtn.click();
}

async navigateToBrowseMoreEvents(){
    await this.browseMoreEventsLink.click()
}
}