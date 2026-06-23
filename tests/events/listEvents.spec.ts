import { test, expect } from '../../fixtures/authFixture.ts';
import { listEventsService } from '../../services/listEventsService';
import fs from 'fs'; 

test('List Events', async () => {

    const token = JSON.parse(
        fs.readFileSync('./auth/token.json', 'utf-8')
    ).token;

    const response = await listEventsService.listEvents(token);

    expect(response.status()).toBe(200);
});