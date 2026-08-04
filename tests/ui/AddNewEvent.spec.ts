import { test, expect } from '@playwright/test';
import { SigninPage } from '../../pages/SignInPage';
import { EvenHubHome } from '../../pages/EventHubHome';
import { AdminEventManagementPage } from '../../pages/CreateNewEvent';
import { credentials } from '../../resources/config/env';
import eventManagementTestData from '../../resources/utilities/uiTestData/eventManagementTestData.json';


test.describe('Admin Event Management Tests', () => {
    let signInPage: SigninPage;
    let evenHubHome: EvenHubHome;
    let adminEventManagementPage: AdminEventManagementPage;

    test.beforeEach(async ({ page }) => {
        signInPage = new SigninPage(page);
        evenHubHome = new EvenHubHome(page);
        adminEventManagementPage = new AdminEventManagementPage(page);

        // Navigate to login page
        await page.goto(eventManagementTestData.url);
    });

    test('Create a new event successfully with all required details', async ({ page }) => {

        // Get event test data
        const eventData = eventManagementTestData.adminEventTestData.techSummit;

        await test.step('Log in to EventHub with valid credentials', async () => {
            // Get credentials from environment variables (stored in GitHub secrets)

            await signInPage.clickSignIn(credentials.username, credentials.password);
            await evenHubHome.verifyLogInSuccess();
            
            console.log('Login successful');
        });

        await test.step('Navigate to Admin > Manage Events', async () => {
            await adminEventManagementPage.navigateToManageEvents();
            await adminEventManagementPage.verifyEventManagementPageLoaded();
            console.log('Successfully navigated to Manage Events page');
        });

        await test.step('Get current event count before adding new event', async () => {
            const initialCount = await adminEventManagementPage.getEventCount();
            expect(initialCount).toBeGreaterThan(0);
            console.log(`Current event count: ${initialCount}`);
        });

        await test.step('Fill event creation form with all required and optional details', async () => {
            await adminEventManagementPage.fillEventForm({
                title: eventData.title,
                description: eventData.description,
                category: eventData.category,
                city: eventData.city,
                venue: eventData.venue,
                dateTime: eventData.dateTime,
                price: eventData.price,
                totalSeats: eventData.totalSeats,
                imageUrl: eventData.imageUrl
            });
            console.log('Event form filled successfully');
        });

        await test.step('Submit the event creation form', async () => {
            // Check for any visible error messages before submission
            const preSubmitErrors = await page.locator('[class*="error"], [role="alert"]').count();
            console.log(`Visible errors before submission: ${preSubmitErrors}`);

            await adminEventManagementPage.submitEventForm();

            

           // await page.waitForTimeout(2000); // Wait for the table to refresh
            // Reload the page to see the latest events
            await page.reload();
            
            console.log('Event form submitted and page reloaded');
        });

        await test.step('Verify newly created event appears in All Events section', async () => {
            // Scroll down to see the table
            await page.locator('text=/All Events/').scrollIntoViewIfNeeded();
            
            const eventFound = await adminEventManagementPage.verifyEventInTable(eventData.title);
            expect(eventFound).toBe(true);
            console.log(`Event "${eventData.title}" verified in All Events table`);
        });

        await test.step('Verify event details in All Events table match the entered information', async () => {
            const detailsMatch = await adminEventManagementPage.verifyEventDetails(
                eventData.title,
                {
                    category: eventData.category,
                    city: eventData.city,
                    date: eventData.expectedDate,
                    price: eventData.expectedPrice
                }
            );
            expect(detailsMatch).toBe(true);
            console.log('Event details verified successfully');
        });

        await test.step('Verify event counter has increased', async () => {
            const finalCount = await adminEventManagementPage.getEventCount();
            expect(finalCount).toBeGreaterThan(0);
            console.log(`Final event count: ${finalCount}`);
        });
    });
});