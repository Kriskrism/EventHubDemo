import { test, expect } from "../../../fixtures/authFixture";
import { RetreiveByRefCode } from "../../../services/bookings/retrieveByReferenceCode";
import { CreateEvent } from "../../../services/events/createNewEvent";
import { EventFactory } from "../../../resources/data/EventFactory";
import { BookingEventFactory } from "../../../resources/data/BookingFactory";
import { CreateNewBooking } from "../../../services/bookings/createNewBookings";
import { DeleteEvent } from "../../../services/events/deleteEvent";
import { getAuthToken } from '../../../resources/utilities/getAuthToken';

test.describe('Retrieve booking by refernce code', () => {
    const token = getAuthToken();

    let bookingPayload: ReturnType<typeof BookingEventFactory.createBooking>
    const eventPayLoad =  EventFactory.create();
    let eventID: number;
    let bookingRef: string

    test.beforeAll('Create a new event and booking', async () => {

        const createResponse = await CreateEvent.createNewEvent(token, eventPayLoad)
        const createBody = await createResponse.json()
        eventID = await createBody.data.id;

        bookingPayload = await BookingEventFactory.createBooking(eventID);
        const bookingEventResponse = await CreateNewBooking.createNewBooking(token, bookingPayload)
        const bookingEventBody = await bookingEventResponse.json();
        bookingRef = await bookingEventBody.data.bookingRef;

    })

    test('Verify retreiving a booking by reference code', async () => {
        const reteiveByRefCodeResponse = await RetreiveByRefCode.getByRefCode(token, bookingRef)

        const reteiveByRefCodeBody = await reteiveByRefCodeResponse.json();
        await expect(reteiveByRefCodeBody.data.bookingRef).toBe(bookingRef)
        await expect(reteiveByRefCodeResponse.status()).toBe(200)
    })

    //booking not found
    test('Verfiy response when booking not found', async()=>{
        const invalidBookingRef = "T-JH$PTW"
        const reteiveByRefCodeResponse = await RetreiveByRefCode.getByRefCode(token, invalidBookingRef)
        const reteiveByRefCodeBody = await reteiveByRefCodeResponse.json();
        await expect(reteiveByRefCodeResponse.status()).toBe(404)
        await expect(reteiveByRefCodeBody.error).toBe(`Booking with reference "${invalidBookingRef}" not found`)

    })

     test.afterAll("Delete the created event", async () => {
        await DeleteEvent.deleteEvent(token, eventID);

    })
})