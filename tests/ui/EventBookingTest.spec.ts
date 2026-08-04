import { test, expect } from '@playwright/test';
import { SigninPage } from '../../pages/SignInPage';
import { EvenHubHome } from '../../pages/EventHubHome';
import { EventsPage } from '../../pages/EventsPage';
import { EventDetailsPage } from '../../pages/EventDetailsPage';
import testData from '../../resources/utilities/uiTestData/testData.json';
import { credentials } from '../../resources/config/env'

test.describe('Event Booking Tests', () => {

    let signInPage: SigninPage;
    let evenHubHome: EvenHubHome;
    let eventsPage: EventsPage;
    let eventDetailsPage: EventDetailsPage;
    let availableSeatsBeforeBooking: number;

    test.beforeEach(async ({ page }) => {
        signInPage = new SigninPage(page);
        evenHubHome = new EvenHubHome(page);
        eventsPage = new EventsPage(page);
        eventDetailsPage = new EventDetailsPage(page);

        // Navigate to login page
        await page.goto(testData.url);
    });

    test("Verify successful event booking with seat reduction", async ({ page }) => {
        // Step 1: Login to event hub
        await signInPage.clickSignIn(credentials.username, credentials.password);
        await evenHubHome.verifyLogInSuccess();

        // Step 2: Navigate to events page
        await eventsPage.navigateToEventsPage();
        // await eventsPage.waitForEventsToLoad();
        //
        await eventsPage.verifyEventListIsDisplayed();

        // Step 3: Get available seats before booking using event name from test data
        const eventNameToBook = testData.eventName;
        console.log(`Booking event: ${eventNameToBook}`);

        availableSeatsBeforeBooking = await eventsPage.getAvailableSeatsForEvent(eventNameToBook);
        console.log(`Available seats before booking: ${availableSeatsBeforeBooking}`);

        // Step 4: Select an event and navigate to details
        await eventsPage.selectEventByName(eventNameToBook);
        await eventDetailsPage.verifyEventDetailsPageLoaded();

        // Verify seats on detail page match the listing page
        const detailPageSeats = await eventDetailsPage.getAvailableSeatsOnDetailPage();

        expect(detailPageSeats).toBe(availableSeatsBeforeBooking);

        // Step 5: Click Book Now
        await eventDetailsPage.clickBookNow();

        // Verify booking success
        await eventDetailsPage.verifyBookingSuccess();

        // Step 6: Navigate back and verify seats are reduced
        await eventDetailsPage.goBackToEvents();
        await eventsPage.waitForEventsToLoad();

        const availableSeatsAfterBooking = await eventsPage.getAvailableSeatsForEvent(eventNameToBook);
        console.log(`Available seats after booking: ${availableSeatsAfterBooking}`);

        // Assert that seats have been reduced
        eventDetailsPage.assertSeatsReduced(availableSeatsBeforeBooking, availableSeatsAfterBooking);
    });

});
