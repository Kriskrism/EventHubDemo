import { test, expect } from '../../../fixtures/authFixture';
import { ListSingleEvent } from '../../../services/events/listSingleEvent';
import { ListEventsService } from '../../../services/events/listEventsService';
import { getAuthToken } from '../../../resources/utilities/getAuthToken';
import { faker } from '@faker-js/faker';

// A structurally valid-looking but bogus JWT, for testing rejection of malformed/invalid tokens.
// (Previously this was read from an empty auth/token.json file and was always `undefined`,
// so this test suite was only ever verifying "no token" behavior, not "invalid token" behavior.)
const INVALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid-payload.invalid-signature';

test.describe('Get the single event using id',  () => {

    let token: string;
    let eventId: number;

    test.beforeAll('Access the event id', async () => {
        //accessing the auth token
        token = getAuthToken();

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
        const response_single_event_auth_fail = await ListSingleEvent.getSingleEventWithNoAuth(INVALID_TOKEN, eventId)
        const body = await response_single_event_auth_fail.json();
        await expect(response_single_event_auth_fail.status()).toBe(401)
        await expect(await body.error).toBe("Unauthorized")

    })

    //verify authorization fails when invalid token is passed
    test('Verify unauthorized access while getting a single event when invalid token is passed', async () => {
        const response_single_event_auth_fail = await ListSingleEvent.getSingleEventWithInvalidAuth(INVALID_TOKEN, eventId)
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