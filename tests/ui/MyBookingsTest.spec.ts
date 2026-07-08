import { test, expect } from '@playwright/test';
import { SigninPage } from '../../pages/SignInPage';
import { EvenHubHome } from '../../pages/EventHubHome';
import { Mybookings } from '../../pages/MyBookings';
import testData from '../../resources/utilities/uiTestData/testData.json';
import { ViewBookingsScreen } from '../../pages/ViewBookingsScreen';
import { credentials } from '../../resources/config/env'

test.describe('My Bookings Page Tests', () => {
    let signInPage: SigninPage;
    let evenHubHome: EvenHubHome;
    let myBookings: Mybookings;
    let viewBookings: ViewBookingsScreen


    test.beforeEach(async ({ page }) => {
        signInPage = new SigninPage(page);
        evenHubHome = new EvenHubHome(page);
        myBookings = new Mybookings(page);
        viewBookings = new ViewBookingsScreen(page)


        // Navigate to login page
        await page.goto(testData.url);

        // Login with valid credentials
        await test.step('Login to EventHub', async () => {
            await signInPage.clickSignIn(credentials.username, credentials.password);
            await evenHubHome.verifyLogInSuccess();
        });

        // Navigate to My Bookings page
        await test.step('Navigate to My Bookings', async () => {
            await evenHubHome.myBookingsLink.click();
            await page.waitForLoadState('networkidle');
        });
    });

    test.skip('Verify all elements on My Bookings page', async ({ page }) => {

        await myBookings.verifyAllElements(testData.eventName, testData.NumberOfTickets, testData.EventCity);



    });

    test('Verify booking details are displayed correctly', async () => {

        await myBookings.clickViewDetails();
        await viewBookings.verifyEventDetails(testData.eventName, testData.Eventdate, testData.EventVenue, testData.EventCity);
        await viewBookings.verifyCustomerDetails(testData.FullName, testData.Email, testData.PhoneNumber);
        await viewBookings.verifyPaymentSummary(testData.NumberOfTickets, testData.PricePerTicket);
        // let bookedDate = await myBookings.verifyConfirmedEvent(testData.eventName, testData.NumberOfTickets, testData.EventVenue);
        // await viewBookings.verifybookingInformation(bookedDate, testData.BookingId);

    })

});
