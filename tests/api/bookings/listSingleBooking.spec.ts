import { any } from "zod";
import { test, expect } from "../../../fixtures/authFixture";
import { BookingEventFactory } from "../../../resources/data/BookingFactory";
import { EventFactory } from "../../../resources/data/EventFactory";
import { CreateNewBooking } from "../../../services/bookings/createNewBookings";
import { ListSingleBooking } from "../../../services/bookings/listSingleBooking";
import { CreateEvent } from "../../../services/events/createNewEvent";
import fs from 'fs'
import { faker } from "@faker-js/faker";
import { DeleteEvent } from "../../../services/events/deleteEvent";

test.describe('Get a single booking by ID', async () => {


    const token = JSON.parse(
        fs.readFileSync('./auth/token.json', 'utf-8')
    ).token;

    let bookingPayload: any
    const eventPayLoad = await EventFactory.create();
    let eventID: number;
    let bookingID: number;
    let bookingEventBody: any;
    let createBody: any;

    //create a new event, book the event and get the booking id
    test.beforeAll(async () => {
        const createResponse = await CreateEvent.createNewEvent(token, eventPayLoad)
        createBody = await createResponse.json()
        eventID = await createBody.data.id;

        bookingPayload = await BookingEventFactory.createBooking(eventID);
        const bookingEventResponse = await CreateNewBooking.createNewBooking(token, bookingPayload)
        bookingEventBody = await bookingEventResponse.json();
        bookingID = await bookingEventBody.data.id;
    })

    test("Get a single booking using valid booking id", async () => {

        const singleBookingIDResponse = await ListSingleBooking.getSingleBookingID(token, bookingID);
        const singleBookingIDBody = await singleBookingIDResponse.json();

        await expect(singleBookingIDResponse.status()).toBe(200)

        await expect(singleBookingIDBody.data.id).toEqual(bookingID)


    })

    //Booking id nof found
    test('Verify response when invalid booking id is passed', async () => {
        const invalidBookingid = faker.number.int({ min: 2, max: 999 })
        const singleBookingIDResponse = await ListSingleBooking.getSingleBookingID(token, invalidBookingid);
        const singleBookingIDBody = await singleBookingIDResponse.json();

        await expect(singleBookingIDResponse.status()).toBe(404)

        await expect(singleBookingIDBody.error).toEqual(`Booking with id ${invalidBookingid} not found`)

    })

     test.afterAll("Delete the created event", async () => {
        await DeleteEvent.deleteEvent(token, eventID);

    })
})