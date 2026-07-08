import { Locator, Page, expect } from "@playwright/test";

export class EventsPage {
    readonly page: Page;
    readonly eventsTitle: Locator;
    readonly eventCards: Locator;
    readonly availableSeatsText: Locator;
    readonly eventNameLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.eventsTitle = page.getByRole('heading', { name: 'Featured Events' });
        // Use a more flexible selector for event cards - look for divs that contain event content
        this.eventCards = page.locator('div[class*="card"], div[class*="event"], article, [role="article"]');
        this.availableSeatsText = page.locator('[class*="seats"], [class*="available"]');
        this.eventNameLocator = page.locator('h3, h4, [class*="title"], [class*="name"]');
    }

    async navigateToEventsPage() {
        try {
            // Navigate to the events link from home page using the nav-events test ID
            const eventsLink = this.page.getByTestId('nav-events');
            if (await eventsLink.isVisible()) {
                await eventsLink.click();
                await this.page.waitForLoadState('networkidle');
            } else {
                throw new Error('Events link not found');
            }
        } catch (error) {
            console.error('Error navigating to events page:', error);
        }
    }

    async getAvailableSeatsForEvent(eventName: string): Promise<number> {
        try {
            // Find the specific event card by searching for the event name
            const eventLocator = this.page.locator(`article, [role="article"]`).filter({ hasText: eventName }).first();
            
            // Look for seats information using getByText() which supports regex
            const seatsElement = eventLocator.getByText(/\d+\s+seats\s+lefts/i);
            const seatsText = await seatsElement.textContent();
            
            if (!seatsText) {
                throw new Error(`Could not find available seats for event: ${eventName}`);
            }

            // Extract number from text like "3000 seats available"
            const seatsMatch = seatsText.match(/\d+/);
            return seatsMatch ? parseInt(seatsMatch[0], 10) : 0;
        } catch (error) {
            console.error(`Error getting seats for event ${eventName}:`, error);
            throw error;
        }
    }

    async selectEventByName(eventName: string) {
        try {
            // Click on the event using flexible selector - try link first, then a clickable element containing the text
            const eventLink = this.page.locator(`a:has-text("${eventName}"), [role="link"]:has-text("${eventName}"), button:has-text("${eventName}"), div[class*="card"]:has-text("${eventName}")`).first();
            await eventLink.click();
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error(`Error selecting event ${eventName}:`, error);
            throw error;
        }
    }

    async verifyEventListIsDisplayed() {
        await expect(this.eventCards.first()).toBeVisible();
    }

    async waitForEventsToLoad() {
        await this.eventCards.first().waitFor({ state: 'visible' });
    }
}
