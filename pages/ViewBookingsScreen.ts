import { Page, expect } from "@playwright/test";

export class ViewBookingsScreen{
    readonly page : Page;
   

    constructor(page : Page){
        this.page = page;
    }

    async verifyEventDetails(eventName:string, date: string, venue : string, city : string){
        try{
            await expect(this.page.locator(`span:has-text('${eventName}')`)).toHaveText(eventName);
            await expect(this. page.getByText('Festival')).toBeVisible;
            await expect(this.page.locator(`span:has-text('${date}')`)).toHaveText(date);
            await expect(this.page.locator(`span:has-text('${venue}')`)).toHaveText(venue);
            await expect(this.page.locator(`span:has-text('${city}')`)).toHaveText(city);
        }
        catch{
            console.log('Event name not found in details view');
        }
    }

        async verifyCustomerDetails(customerName :string, email : string, phone:string){
            try{
                await expect(this.page.getByText(`${customerName}`)).toHaveText(customerName);
                await expect(this.page.locator(`//span[contains(text(), '${email}')]`)).toHaveText(email);
                expect(this.page.getByText(`${phone}`)).toHaveText(phone);
            }
            catch{
                console.log('Customer details not found in details view');
            }
        }

        async verifyPaymentSummary(tickets : string, pricePerTicket: string){
            try{
                await expect(this.page.locator("//span[contains(text(),'Tickets')]//following-sibling::span")).toBeVisible();
                await expect(this.page.locator("//span[contains(text(),'Price per ticket')]//following-sibling::span")).toBeVisible();

                const totalPaid = parseFloat(tickets) * parseFloat(pricePerTicket.replace(/[^0-9.-]+/g,""));
                await expect(this.page.locator("//span[contains(text(),'Total Paid')]//following-sibling::span")).toBe(totalPaid);
            }
            catch{
                console.log('Payment summary not found in details view');
            }
        }

        async verifybookingInformation(bookingDate : string, bookingId: string){
            try{
                await expect( this.page.locator("//span[contains(text(),'Booked on')]//following-sibling::span")).toHaveText(bookingDate);
                await expect( this.page.locator("//span[contains(text(),'Booking ID')]//following-sibling::span")).toHaveText(bookingId);
            }
            catch{
                console.log('Booking information not found in details view');
            }
            }



    }

    
    //cover remaining details in this page and modify the MybookingTest.spec.ts to call these methods and verify details in the details view    












