import { test, expect } from "../../../fixtures/authFixture";

import { CreateNewBooking } from "../../../services/bookings/createNewBookings";
import fs from 'fs'
import { BookingEventFactory } from "../../../resources/data/BookingFactory";
import { CreateEvent } from "../../../services/events/createNewEvent";
import { EventFactory } from "../../../resources/data/EventFactory";
import { BookingResponseSchema } from "../../../apiJSONSchema/bookings/createBooking.schema";
import { DeleteEvent } from "../../../services/events/deleteEvent";

test.describe("Create a new booking",  () => {

    const token = JSON.parse(
        fs.readFileSync('./resources/utilities/apiTestData/token.json', 'utf-8')
    ).token;

    let bookingPayload: any
    const eventPayLoad =  EventFactory.create();
    let eventID: number;

    //create a new event
    test.beforeAll('Create a new event', async () => {
        const createResponse = await CreateEvent.createNewEvent(token, eventPayLoad)
        const createBody = await createResponse.json()
        eventID = await createBody.data.id;
    })

    test('Create a new booking using valid credentials', async () => {

        bookingPayload = await BookingEventFactory.createBooking(eventID);
        const bookingEventResponse = await CreateNewBooking.createNewBooking(token, bookingPayload)
        const bookingEventBody = await bookingEventResponse.json();
        
        await expect(bookingEventResponse.status()).toBe(201);
        await expect(bookingEventBody.message).toBe("Booking confirmed!")

        //validate the schema
        await BookingResponseSchema.parse(bookingEventBody)


    })

     test.afterAll("Delete the created event", async () => {
        await DeleteEvent.deleteEvent(token, eventID);

    })
})