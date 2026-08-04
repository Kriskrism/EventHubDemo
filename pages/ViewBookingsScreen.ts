import { Page, expect } from "@playwright/test";

export class ViewBookingsScreen{
    readonly page : Page;
   

    constructor(page : Page){
        this.page = page;
    }

    async verifyEventDetails(eventName:string, date: string, venue : string, city : string){
        await expect(this.page.locator(`span:has-text('${eventName}')`)).toHaveText(eventName);
        await expect(this.page.getByText('Festival')).toBeVisible();
        await expect(this.page.locator(`span:has-text('${date}')`)).toHaveText(date);
        await expect(this.page.locator(`span:has-text('${venue}')`)).toHaveText(venue);
        await expect(this.page.locator(`span:has-text('${city}')`)).toHaveText(city);
    }

    async verifyCustomerDetails(customerName :string, email : string, phone:string){
        await expect(this.page.getByText(`${customerName}`)).toHaveText(customerName);
        await expect(this.page.locator(`//span[contains(text(), '${email}')]`)).toHaveText(email);
        await expect(this.page.getByText(`${phone}`)).toHaveText(phone);
    }

    async verifyPaymentSummary(tickets : string, pricePerTicket: string){
        await expect(this.page.locator("//span[contains(text(),'Tickets')]//following-sibling::span")).toBeVisible();
        await expect(this.page.locator("//span[contains(text(),'Price per ticket')]//following-sibling::span")).toBeVisible();

        const totalPaid = parseFloat(tickets) * parseFloat(pricePerTicket.replace(/[^0-9.-]+/g,""));
        await expect(this.page.locator("//span[contains(text(),'Total Paid')]//following-sibling::span")).toHaveText(`$${totalPaid}`);
    }

    async verifybookingInformation(bookingDate : string, bookingId: string){
        await expect( this.page.locator("//span[contains(text(),'Booked on')]//following-sibling::span")).toHaveText(bookingDate);
        await expect( this.page.locator("//span[contains(text(),'Booking ID')]//following-sibling::span")).toHaveText(bookingId);
    }

}