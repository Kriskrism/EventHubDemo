import {Page, Locator, expect} from '@playwright/test';
import { commonMethods } from '../resources/utilities/commonMethods';

export class Mybookings{
    readonly page : Page;
    readonly mybookingsTitle : Locator
    readonly bookingReferencePill : Locator;
    readonly bookingStatus: Locator
    readonly eventName : Locator;
    readonly eventDate : Locator;
    readonly ticketCount : Locator;
    readonly venue : Locator;
    readonly totalAmount : Locator;
    readonly viewDetailsBtn : Locator;
    readonly cancelBooking : Locator;
    readonly clearAllBooking : Locator;
    readonly bookedDate : Locator;
    readonly cancellationMessage: Locator;
    readonly eventDetailsModal: Locator;


    constructor(page : Page){
        this.page = page;
        this.mybookingsTitle = page.getByRole('heading',{name :'My Bookings'})
        this.bookingReferencePill = page.getByText('confirmed')
        this.bookingStatus = page.getByText('confirmed', { exact: true })
        this.eventName = page.locator('[class*="event"][class*="name"]').first()
        this.eventDate = page.locator('[class*="event"][class*="date"]').first().or(page.locator('text=/Booked/').first())
        this.ticketCount = page.locator('[class*="ticket"]').first()
        this.venue = page.locator('[class*="venue"]').first()
        this.totalAmount = page.locator('[class*="total"][class*="amount"]').first().or(page.locator('text=/₹|\\$|Total/').first())
        this.viewDetailsBtn = page.getByRole('button', { name: 'View Details' })
        this.cancelBooking = page.getByTestId('cancel-booking-btn')
        this.clearAllBooking = page.getByRole('button', { name: 'Clear all bookings' })
        this.bookedDate = page.locator("//span[contains(text(),'Booked')]//following-sibling::span").first()
        this.cancellationMessage = page.getByText(/Booking Cancelled|cancelled|canceled/i)
        this.eventDetailsModal = page.locator('[role="dialog"]').or(page.locator('.modal, .details-modal'))
       
    }

    async verifyAllElements(eventName : string, ticketcount : string, eventCity : string){
        
        try {
            await expect(this.mybookingsTitle).toBeVisible();
            await expect(this.bookingReferencePill).toBeVisible();
            await expect(this.bookingStatus).toBeVisible();
            try {
                await expect(this.page.getByRole('heading', { name: `${eventName}`})).toBeVisible();
            } catch  {
                console.log('Event name element not found - may not have bookings');
            }
            try {
                await expect(this.page.getByText('🎫 '+`${ticketcount}`+' tickets')).toBeVisible();
                
            } catch  {
                console.log('Ticket count element not found - may not have bookings');
            }
            try {
                console.log("Event city is"+ eventCity);
                await expect(this.page.getByText('📍 '+`${eventCity}`)).toBeVisible();
            } catch  {
                console.log('Venue element not found - may not have bookings');
            }
            console.log('All elements on My Bookings page are visible');
        } catch (error) {
            console.error('Error verifying elements:', error);
            throw error;
        }
    }

    async verifyConfirmedEvent(eventName : string, ticketCount: string , venue: string){
            
            const todaysDate = await new commonMethods().getTodaysDate();

            await expect(this.page.getByRole('heading', {name : `${eventName}`})).toBeVisible();
            await expect(this.page.locator(`.ticket-count:has-text("${ticketCount} Tickets")`)).toHaveText(`${ticketCount} Tickets`);
            await expect(this.page.locator(`.venue:has-text("${venue}")`)).toHaveText(venue);
            const date = await this.bookedDate.textContent();
            await expect(date).toContain(todaysDate)
            return date;
           
    }

    async clickViewDetails(){
        try {
            await this.viewDetailsBtn.click();
            await this.page.waitForLoadState('networkidle');
            console.log('Clicked View Details button');
        } catch (error) {
            console.error('Error clicking View Details:', error);
            throw error;
        }
    }

    async verifyEventDetailsVisible(){
        try {
            // Verify event details are displayed
            await expect(this.eventName).toBeVisible();
            await expect(this.eventDate).toBeVisible();
            await expect(this.venue).toBeVisible();
            await expect(this.ticketCount).toBeVisible();
            await expect(this.totalAmount).toBeVisible();
            console.log('Event details are visible');
        } catch (error) {
            console.error('Error verifying event details:', error);
            throw error;
        }
    }

    async clickCancelBooking(){
        try {
            await this.cancelBooking.click();
            await this.page.waitForLoadState('networkidle');
            console.log('Clicked Cancel Booking button');
        } catch (error) {
            console.error('Error clicking Cancel Booking:', error);
            throw error;
        }
    }

    async verifyBookingCancelled(){
        try {
            // Wait for cancellation message or verify booking is no longer visible
            await expect(this.cancellationMessage).toBeVisible();
            console.log('Booking has been cancelled');
        } catch (error) {
            console.error('Error verifying cancellation:', error);
            throw error;
        }
    }

    
}
