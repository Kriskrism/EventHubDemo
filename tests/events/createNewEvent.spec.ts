
import { createeventSchema } from '../../apiJSONSchema/event/createEvent.schema.ts';
import { test, expect } from '../../fixtures/authFixture.ts';
import { createEvent } from '../../services/createNewEvent.ts';
import fs from 'fs';

let response;

test.describe("Create new events", async () => {

    //accessing the auth token
    const token = JSON.parse(
        fs.readFileSync('./auth/token.json', 'utf-8')
    ).token;

    test('Create a new event successfully', async () => {
        response = await createEvent.createNewEvent(token);
        expect(response.status()).toBe(201)

        const body = await response.json();
        expect(body).toHaveProperty('message');

        //validate the schema for valid resposne
        createeventSchema.validResponse.parse(body);

    })

    test('Create a new event with validation error', async () => {

        response = await createEvent.createNewEventWithValidationError(token);
        expect(response.status()).toBe(400)

        //validate the response body
        const body = await response.json();
        expect(body).toHaveProperty('details');
        
        expect(body.details[0].field).toBe("city");
        expect(body.details[0].message).toBe("City is required");

        //validate the schema for invalid event creation
        createeventSchema.invalidResponse.parse(body)
    })

    test("create new event with invalid token", async()=>{
        //const invalidtoken  = token +"abcd"
        const response = await createEvent.createNewEvent(" ")
        const body = await response.json();
        await expect(response.status()).toBe(401);
        await expect (body.error).toBe("Unauthorized")
        
        //validate the schema
        createeventSchema.unauthorizedResponse.parse(body);
    })





})





