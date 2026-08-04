import { test, expect } from "../../../fixtures/authFixture";
import { CreateEvent } from "../../../services/events/createNewEvent";
import { EventFactory } from "../../../resources/data/EventFactory";
import { BookingEventFactory } from "../../../resources/data/BookingFactory";
import { CreateNewBooking } from "../../../services/bookings/createNewBookings";
import { DeleteBooking } from "../../../services/bookings/deleteBooking";
import { ListSingleEvent } from '../../../services/events/listSingleEvent';
import { DeleteEvent } from "../../../services/events/deleteEvent";
import { getAuthToken } from '../../../resources/utilities/getAuthToken';


test.describe( () => {
    const token = getAuthToken();

    let bookingPayload: ReturnType<typeof BookingEventFactory.createBooking>;
    const eventPayLoad =  EventFactory.create();
    let eventID: number;
    let bookingId: number;
    let availableSeat: number;
    let noOfTickets: number;

    //create a new event , book the event and get the bookingID
    test.beforeAll('Create a new event and booking', async () => {

        //create a new event
        const createResponse = await CreateEvent.createNewEvent(token, eventPayLoad)
        const createBody = await createResponse.json()
        eventID = await createBody.data.id;

        //book the event and get the booking id and no of tickets booked
        bookingPayload = await BookingEventFactory.createBooking(eventID);
        noOfTickets = bookingPayload.quantity;

        const bookingEventResponse = await CreateNewBooking.createNewBooking(token, bookingPayload)
        const bookingEventBody = await bookingEventResponse.json();
        bookingId = await bookingEventBody.data.id;

        //list the event using event id
        const listeventResponse = await ListSingleEvent.getSingleEvent(token, eventID)
        const listeventBody = await listeventResponse.json();
        availableSeat = await listeventBody.data.availableSeats;


    })

    test.afterAll("Delete the created event", async () => {
        await DeleteEvent.deleteEvent(token, eventID);

    })

    //delete booking with valid booking id
    test('Delete a booking with valid id', async () => {
        const deleteBookingResponse = await DeleteBooking.deleteBooking(token, bookingId);
        const deleteBookingBody = await deleteBookingResponse.json();

       expect(deleteBookingResponse.status()).toBe(200)
       expect(deleteBookingBody.message).toBe("Booking cancelled")


        //calling list event again after deleting a booking
        const listeventResponse = await ListSingleEvent.getSingleEvent(token, eventID)
        const listeventBody = await listeventResponse.json();
        const availableSeatAfterDelete = await listeventBody.data.availableSeats;

        //verify the released ticket is restored back to availableSeats count 
         expect(availableSeat + noOfTickets).toBe(availableSeatAfterDelete)


    })

    


})