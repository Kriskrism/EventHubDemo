import { test, expect } from '../../../fixtures/authFixture.ts';
import { ListSingleEvent } from '../../../services/events/listSingleEvent.ts';
import { ListEventsService } from '../../../services/events/listEventsService.ts';
import fs from 'fs';
import { faker } from '@faker-js/faker';

test.describe('Get the single event using id', async () => {

    let token: string;
    let eventId: number;
    let invalidToken: string;

    test.beforeAll('Access the event id', async () => {
        //accessing the auth token
        token = JSON.parse(
            fs.readFileSync('./auth/token.json', 'utf-8')
        ).token;

        invalidToken = JSON.parse(
            fs.readFileSync('./auth/token.json', 'utf-8')
        ).invalidToken;

        const list_Response = await ListEventsService.listEvents(token);
        const list_Body = await list_Response.json()

        eventId = await list_Body.data[0].id;

    })

    //verify if the correct event is passed with valid id
    test('Get single event using id', async () => {
        const response_Single_Event = await ListSingleEvent.getSingleEvent(token, eventId);
        const body = await response_Single_Event.json();
        await expect(response_Single_Event.status()).toBe(200)
        await expect(await body.data.id).toBe(eventId)
    })

    // verify authorization fails when no token is passed
    test('Verify unauthorized access while getting a single event when no token is passed', async () => {
        const response_single_event_auth_fail = await ListSingleEvent.getSingleEventWithNoAuth(invalidToken, eventId)
        const body = await response_single_event_auth_fail.json();
        await expect(response_single_event_auth_fail.status()).toBe(401)
        await expect(await body.error).toBe("Unauthorized")

    })

    //verify authorization fails when invalid token is passed
    test('Verify unauthorized access while getting a single event when invalid token is passed', async () => {
        const response_single_event_auth_fail = await ListSingleEvent.getSingleEventWithInvalidAuth(invalidToken, eventId)
        const body = await response_single_event_auth_fail.json();
        await expect(response_single_event_auth_fail.status()).toBe(401)
        await expect(await body.error).toBe("Invalid or expired token")

    })

    //Verify response when event is not found
    test('Verify event not found', async () => {
        const invalidEventId = faker.number.int();
        const noEventResponse = await ListSingleEvent.getSingleEvent(token, invalidEventId)
        const noEventBody = await noEventResponse.json();

        await expect(noEventResponse.status()).toBe(404);
        await expect(noEventBody.error).toBe(`Event with id ${invalidEventId} not found`);
    })


})

