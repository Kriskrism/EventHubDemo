import { Page, Locator, expect } from '@playwright/test';

export class AdminEventManagementPage {
    readonly page: Page;
    readonly newEventHeading: Locator;
    readonly titleField: Locator;
    readonly descriptionField: Locator;
    readonly categoryDropdown: Locator;
    readonly cityField: Locator;
    readonly venueField: Locator;
    readonly eventDateTimeField: Locator;
    readonly priceField: Locator;
    readonly totalSeatsField: Locator;
    readonly imageUrlField: Locator;
    readonly addEventButton: Locator;
    readonly allEventsHeading: Locator;
    readonly eventsCountDisplay: Locator;
    readonly eventsTable: Locator;
    readonly adminButton: Locator;
    readonly manageEventsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newEventHeading = page.getByRole('heading', { name: '+ New Event' });
        this.titleField = page.getByPlaceholder('Event title');
        this.descriptionField = page.getByPlaceholder('Describe the event…');
        this.categoryDropdown = page.locator('select, [role="combobox"]').first();
        this.cityField = page.getByPlaceholder(/e\.g\. Bangalore|City/i);
        this.venueField = page.getByPlaceholder(/Venue|address/i);
        // Find date/time field by looking for textbox inputs in form order
        this.eventDateTimeField = page.getByRole('textbox', { name: 'Event Date & Time*' })
        this.priceField = page.locator('input[type="number"]').first();
        this.totalSeatsField = page.locator('input[type="number"]').last();
        this.imageUrlField = page.getByPlaceholder('https://');
        this.addEventButton = page.getByRole('button', { name: /Add Event/i });
        this.allEventsHeading = page.getByRole('heading', { name: 'All Events' });
        this.eventsCountDisplay = page.locator('text=/\\d+ total/');
        this.eventsTable = page.locator('table');
        this.adminButton = page.getByRole('button', { name: 'Admin' });
        this.manageEventsLink = page.getByRole('navigation').getByRole('link', { name: 'Manage Events' });
    }

    /**
     * Click on Admin button to open admin dropdown menu
     */
    async clickAdminButton() {
        try {
            await this.adminButton.click();
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Error clicking Admin button:', error);
            throw error;
        }
    }

    /**
     * Click on Manage Events link from admin dropdown
     */
    async clickManageEventsLink() {
        try {
            await this.manageEventsLink.click();
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Error clicking Manage Events link:', error);
            throw error;
        }
    }

    /**
     * Navigate to Admin > Manage Events page
     */
    async navigateToManageEvents() {
        try {
            await this.clickAdminButton();
            await this.clickManageEventsLink();
        } catch (error) {
            console.error('Error navigating to Manage Events:', error);
            throw error;
        }
    }

    /**
     * Verify that the event management page is loaded
     */
    async verifyEventManagementPageLoaded() {
        try {
            await expect(this.newEventHeading).toBeVisible();
            await expect(this.allEventsHeading).toBeVisible();
            await expect(this.eventsTable).toBeVisible();
            console.log('Event management page loaded successfully');
        } catch (error) {
            console.error('Error verifying event management page:', error);
            throw error;
        }
    }

    /**
     * Fill event creation form with all required and optional details
     */
    async fillEventForm(eventDetails: {
        title: string;
        description?: string;
        category: string;
        city: string;
        venue: string;
        dateTime: string;
        price: string;
        totalSeats: string;
        imageUrl?: string;
    }) {
        try {
            // Fill Title
            await this.titleField.fill(eventDetails.title);
            console.log(`Title entered: ${eventDetails.title}`);

            // Fill Description (optional)
            if (eventDetails.description) {
                await this.descriptionField.fill(eventDetails.description);
                console.log(`Description entered: ${eventDetails.description}`);
            }

            // Select Category
            const categorySelect = this.categoryDropdown;
            await categorySelect.click();
            const option = this.page.locator(`option:has-text("${eventDetails.category}"), [role="option"]:has-text("${eventDetails.category}")`).first();
            if (await option.isVisible({ timeout: 2000 }).catch(() => false)) {
                await option.click();
            }
            console.log(`Category selected: ${eventDetails.category}`);

            // Fill City
            await this.cityField.fill(eventDetails.city);
            console.log(`City entered: ${eventDetails.city}`);

            // Fill Venue
            await this.venueField.fill(eventDetails.venue);
            console.log(`Venue entered: ${eventDetails.venue}`);

            // Fill Event Date & Time
            await this.eventDateTimeField.scrollIntoViewIfNeeded();
            await this.eventDateTimeField.fill(eventDetails.dateTime);
            console.log(`Event Date & Time entered: ${eventDetails.dateTime}`);

            // Fill Price
            await this.priceField.fill(eventDetails.price);
            console.log(`Price entered: ${eventDetails.price}`);

            // Fill Total Seats
            await this.totalSeatsField.fill(eventDetails.totalSeats);
            console.log(`Total Seats entered: ${eventDetails.totalSeats}`);

            // Fill Image URL (optional)
            if (eventDetails.imageUrl) {
                await this.imageUrlField.fill(eventDetails.imageUrl);
                console.log(`Image URL entered: ${eventDetails.imageUrl}`);
            }
        } catch (error) {
            console.error('Error filling event form:', error);
            throw error;
        }
    }

    /**
     * Submit the event creation form
     */
    async submitEventForm() {
        try {
            await this.addEventButton.click();
            // Wait for the page to process the form submission
            await this.page.waitForLoadState('networkidle');
            console.log('Event form submitted successfully');
        } catch (error) {
            console.error('Error submitting event form:', error);
            throw error;
        }
    }

    /**
     * Get the current event count from the All Events section
     */
    async getEventCount() {
        try {
            const countText = await this.eventsCountDisplay.textContent();
            const match = countText?.match(/(\d+) total/);
            return match ? parseInt(match[1], 10) : 0;
        } catch (error) {
            console.error('Error getting event count:', error);
            throw error;
        }
    }

    /**
     * Verify that a specific event appears in the All Events table
     */
    async verifyEventInTable(eventTitle: string) {
        try {
            // First check if table exists
            await this.eventsTable.waitFor({ state: 'visible', timeout: 3000 });
            
            // Try different table selectors as tables can have different structures
            let eventRow = this.page.locator(`table tr:has-text("${eventTitle}")`).first();
            
            // If not found, try tbody
            if (!await eventRow.isVisible({ timeout: 1000 }).catch(() => false)) {
                eventRow = this.page.locator(`table tbody tr`).filter({ hasText: eventTitle }).first();
            }
            
            // If still not found, try looking for any row with the text
            if (!await eventRow.isVisible({ timeout: 1000 }).catch(() => false)) {
                eventRow = this.page.locator(`tr`).filter({ hasText: eventTitle }).first();
            }
            
            await eventRow.waitFor({ state: 'visible', timeout: 3000 });
            console.log(`Event "${eventTitle}" found in All Events table`);
            return true;
        } catch (error) {
            console.error(`Event "${eventTitle}" not found in All Events table:`, error);
            // Log table contents for debugging
            try {
                const tableText = await this.eventsTable.textContent();
                console.log('Current table contents:', tableText);
            } catch (e) {
                console.error('Could not retrieve table contents');
            }
            return false;
        }
    }

    /**
     * Get event details from the All Events table
     */
    async getEventDetailsFromTable(eventTitle: string) {
        try {
            const eventRow = this.page.locator(`table tbody tr`).filter({ hasText: eventTitle }).first();
            
            const isVisible = await eventRow.isVisible({ timeout: 3000 }).catch(() => false);
            if (!isVisible) {
                console.error(`Event row for "${eventTitle}" not found`);
                return null;
            }

            const cells = eventRow.locator('td');
            const cellCount = await cells.count();

            if (cellCount < 5) {
                console.error(`Event row does not have enough columns. Found ${cellCount} columns`);
                return null;
            }

            // Extract text content from cells
            const title = (await cells.nth(0).textContent()) || '';
            const category = (await cells.nth(1).textContent()) || '';
            const city = (await cells.nth(2).textContent()) || '';
            const date = (await cells.nth(3).textContent()) || '';
            const price = (await cells.nth(4).textContent()) || '';
            const seats = cellCount > 5 ? (await cells.nth(5).textContent()) || '' : '';

            return {
                title: title.trim(),
                category: category.trim(),
                city: city.trim(),
                date: date.trim(),
                price: price.trim(),
                seats: seats.trim(),
            };
        } catch (error) {
            console.error('Error getting event details from table:', error);
            return null;
        }
    }

    /**
     * Verify all event details match the entered information
     */
    async verifyEventDetails(eventTitle: string, expectedDetails: {
        category: string;
        city: string;
        date: string;
        price: string;
        seats?: string;
    }) {
        try {
            const eventDetails = await this.getEventDetailsFromTable(eventTitle);
            
            if (!eventDetails) {
                console.error('Could not retrieve event details from table');
                return false;
            }

            const isMatch = 
                eventDetails.title.includes(eventTitle) &&
                eventDetails.category.includes(expectedDetails.category) &&
                eventDetails.city.includes(expectedDetails.city) &&
                eventDetails.price.includes(expectedDetails.price);

            if (isMatch) {
                console.log(`Event details verified for "${eventTitle}"`);
            } else {
                console.error(`Event details do not match for "${eventTitle}":`, {
                    expected: expectedDetails,
                    actual: eventDetails
                });
            }

            return isMatch;
        } catch (error) {
            console.error('Error verifying event details:', error);
            return false;
        }
    }
}