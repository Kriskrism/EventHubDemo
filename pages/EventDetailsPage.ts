import { Locator, Page, expect } from "@playwright/test";

export class EventDetailsPage {
    readonly page: Page;
    readonly eventTitle: Locator;
    readonly availableSeatsDetail: Locator;
    readonly bookNowButton: Locator;
    readonly bookingSuccessMessage: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.eventTitle = page.locator('h1, h2').first();
        this.availableSeatsDetail = page.locator('text=/seats|available/i').first();
        this.bookNowButton = page.getByRole('button', { name: /Book Now|book/i }).first();
        this.bookingSuccessMessage = page.getByText(/Booking successful|confirmed|booked/i);
        this.backButton = page.getByRole('button', { name: /Back|back/i }).or(page.getByRole('link', { name: 'Events' })).first();
    }

    async verifyEventDetailsPageLoaded() {
        await expect(this.eventTitle).toBeVisible();
    }

    async getAvailableSeatsOnDetailPage(): Promise<number> {
        const seatsText = await this.availableSeatsDetail.first().textContent();
        
        if (!seatsText) {
            throw new Error('Could not find available seats on detail page');
        }

        // Extract number from text like "Available Seats: 5" or "5 Seats Available"
        const seatsMatch = seatsText.match(/\d+/);
        return seatsMatch ? parseInt(seatsMatch[0], 10) : 0;
    }

    async clickBookNow() {
        try {
            await this.bookNowButton.click();
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Error clicking Book Now button:', error);
        }
    }

    async verifyBookingSuccess() {
        await expect(this.bookingSuccessMessage).toBeVisible();
    }

    async goBackToEvents() {
        try {
            await this.backButton.click();
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Error navigating back:', error);
        }
    }

    async assertSeatsReduced(initialSeats: number, finalSeats: number) {
        expect(finalSeats).toBeLessThan(initialSeats);
    }
}
