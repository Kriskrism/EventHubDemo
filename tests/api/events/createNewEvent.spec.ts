
import { createeventSchema } from '../../../apiJSONSchema/event/createEvent.schema.ts';
import { test, expect } from '../../../fixtures/authFixture.ts';
import { EventFactory } from '../../../resources/data/EventFactory.ts';
import { CreateEvent } from '../../../services/events/createNewEvent.ts';
import { DeleteEvent } from "../../../services/events/deleteEvent";
import fs from 'fs';

let response;
let eventID: number;

test.describe("Create new events",  () => {

    //accessing the auth token
    const token = JSON.parse(
        fs.readFileSync('./resources/utilities/apiTestData/token.json', 'utf-8')
    ).token;

    const payLoad = EventFactory.create();

    test('Create a new event successfully', async () => {
        response = await CreateEvent.createNewEvent(token, payLoad);
        expect(response.status()).toBe(201)

        const body = await response.json();
        expect(body).toHaveProperty('message');

        //validate the schema for valid resposne
        createeventSchema.validResponse.parse(body);

        //extracting the eventId
        eventID = await body.data.id;

    })

    test('Create a new event with validation error', async () => {

        const invalidPayload = {
            ...EventFactory.create(),
            title: "", // override freely in test
        };
        response = await CreateEvent.createNewEventWithValidationError(token, invalidPayload);
        expect(response.status()).toBe(400)

        //validate the response body
        const body = await response.json();
        expect(body).toHaveProperty('details');

        expect(body.details[0].field).toBe("title");
        expect(body.details[0].message).toBe("Title is required");

        //validate the schema for invalid event creation
        createeventSchema.invalidResponse.parse(body)
    })

    test("create new event with invalid token", async () => {
        //const invalidtoken  = token +"abcd"
        const response = await CreateEvent.createNewEvent(" ", payLoad)
        const body = await response.json();
        await expect(response.status()).toBe(401);
        await expect(body.error).toBe("Unauthorized")

        //validate the schema
        createeventSchema.unauthorizedResponse.parse(body);
    })

    //deleting the event after the test is completed
    test.afterAll(async () => {
        await DeleteEvent.deleteEvent(token, eventID);
    });



})





