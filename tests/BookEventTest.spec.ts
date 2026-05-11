import { Page, test, expect } from '@playwright/test';
import { SigninPage } from '../pages/SignInPage';
import { EvenHubHome } from '../pages/EventHubHome';
import { EventsPage } from '../pages/EventsPage';
import { EventDetailsPage } from '../pages/EventDetailsPage';
import testData from '../resources/testData.json';
import { BookEventPage } from '../pages/BookEventPage';
let bookingRefNumber;

test.describe('Event Booking Tests', () => {

    let signInPage: SigninPage;
    let evenHubHome: EvenHubHome;
    let eventsPage: EventsPage;
    let eventDetailsPage: EventDetailsPage;
    let availableSeatsBeforeBooking: number;
    let bookeventPage: BookEventPage;

    test.beforeEach(async ({ page }) => {
        signInPage = new SigninPage(page);
        evenHubHome = new EvenHubHome(page);
        eventsPage = new EventsPage(page);
        eventDetailsPage = new EventDetailsPage(page);
        bookeventPage = new BookEventPage(page);
        
        // Navigate to login page
        await page.goto(testData.url);
    });

    test("Book event successfully", async () => {
        
        await test.step("Login to event hub", async () => {
            await signInPage.clickSignIn(testData.Email, testData.Password);
            await evenHubHome.verifyLogInSuccess();
        });

        await test.step("Navigate to events page", async () => {
            await eventsPage.navigateToEventsPage();
            await eventsPage.verifyEventListIsDisplayed();
            await eventsPage.selectEventByName(testData.eventName);
        });

        await test.step("Navigate to Booking screen and book tickets", async () => {
            await bookeventPage.verifyEventDetails(testData.eventName, testData.EventTime, testData.Eventdate, testData.EventVenue, testData.EventCity, parseInt(testData.NumberOfTickets), parseInt(testData.PricePerTicket));
            await bookeventPage.bookTickets(testData.FullName, testData.Email, testData.PhoneNumber, parseInt(testData.NumberOfTickets));
        });

        await test.step("Verify the booking is successful", async()=>{
            bookingRefNumber = await bookeventPage.verifyBookingConfirmed(testData.FullName, parseInt(testData.NumberOfTickets));
        })

    });
});


