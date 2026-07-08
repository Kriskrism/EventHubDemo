import { test, expect } from '../../../fixtures/authFixture.ts';
import { UpdateSingleEvent } from '../../../services/events/updateEvent.ts';
import { EventFactory } from '../../../resources/data/EventFactory';
import { CreateEvent } from '../../../services/events/createNewEvent.ts';
import { updateeventSchema } from '../../../apiJSONSchema/event/updateEvent.schema.ts';
import fs from 'fs'
import { DeleteEvent } from '../../../services/events/deleteEvent.ts';

test.describe("Update events", async () => {

    let eventID: number;

    const createEventData = EventFactory.create();

    //accessing the auth token
    const token = JSON.parse(
        fs.readFileSync('./resources/utilities/apiTestData/token.json', 'utf-8')
    ).token;


    //accessing the payload for update
    const eventData = EventFactory.update();


    test.beforeAll("Create a new event", async () => {
        const createResponse = await CreateEvent.createNewEvent(token, createEventData);
        const createBody = await createResponse.json();
        eventID = await createBody.data.id;
    })

    test("Update a single event using valid token", async () => {
        const response = await UpdateSingleEvent.updateSingleEvent(token, eventID, eventData)
        await expect(response.status()).toBe(200)
        const updateBody = await response.json()

        await expect(updateBody.data.title).toBe(eventData.title)
        await expect(updateBody.data.id).toBe(eventID)


        //validate the schema for valid resposne
        updateeventSchema.validResponse.parse(updateBody);
    })

    //verify validation error
    test("Verify validation error while updating an event", async () => {
        const payload = {
            ...EventFactory.update(),
            title: "", // override freely in test
        };
        const response = await UpdateSingleEvent.updateSingleEvent(token, eventID, payload)
        await expect(response.status()).toBe(400)
        const updateBody = await response.json()

        await expect(updateBody.error).toBe("Validation failed")

        //validate the schema for invalid event creation
        updateeventSchema.invalidResponse.parse(updateBody)

    })

    //verify event not found
    test("Verify update event not found", async () => {
        const invalidEventId = eventID + 10;
        const updateResponse = await UpdateSingleEvent.updateSingleEvent(token, invalidEventId, eventData)
        const body = await updateResponse.json();

        await expect(updateResponse.status()).toBe(404)
        await expect(body.error).toBe(`Event with id ${invalidEventId} not found`)

        //validate the schema for invalid event creation
        updateeventSchema.unauthorizedResponse.parse(body)
    })

    //Verify unauthorized access
    test('Verify unauthorized access', async () => {
        const updateResponse = await UpdateSingleEvent.getUpdateEventWithNoAuth(token, eventID, eventData)
        const body = await updateResponse.json();

        await expect(updateResponse.status()).toBe(401)
        await expect(body.error).toBe('Unauthorized')

        //validate the schema for invalid event creation
        updateeventSchema.unauthorizedResponse.parse(body)
    })

    //deleting the event after the test is completed
    test.afterAll(async () => {
        await DeleteEvent.deleteEvent(token, eventID);
    });


})