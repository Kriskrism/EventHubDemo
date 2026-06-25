import { faker } from "@faker-js/faker";

export class BookingEventFactory {

    static createBooking(eventID : number) {
        return {
            eventId: eventID,
            customerName: faker.person.fullName(),
            customerEmail: faker.internet.email(),
            customerPhone: `+91-${faker.string.numeric(10)}`,
            quantity: faker.number.int({min : 1, max:10}),

        };
    }
}