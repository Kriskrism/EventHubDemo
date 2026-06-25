import { test, expect } from '../../../fixtures/authFixture.ts';
import { ListEventsService } from '../../../services/events/listEventsService.ts';
import fs from 'fs'; 

test('List Events', async () => {

    const token = JSON.parse(
        fs.readFileSync('./auth/token.json', 'utf-8')
    ).token;

    const response = await ListEventsService.listEvents(token);

    expect(response.status()).toBe(200);
});