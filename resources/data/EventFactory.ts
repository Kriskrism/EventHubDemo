import { faker } from "@faker-js/faker";

export class EventFactory {

    static create() {
        return {
            title: faker.company.catchPhrase(),
            description: faker.lorem.sentence(),
            category: 'Conference',
            venue: 'Bangalore International Centre',
            city: faker.location.city(),
            eventDate: faker.date.future().toISOString(),
            price: faker.number.float({
                min:10,
                max:9999,
                fractionDigits:2
            }),
            totalSeats: faker.number.int({
                min:1,
                max:999
            }),
            imageUrl: "https://example.com/banner.jpg"

        };
    }

    static update(overrides = {}) {
        return {
            ...this.create(),
            title: `Updated ${faker.company.catchPhrase()}`,
            ...overrides
        };
    }
}