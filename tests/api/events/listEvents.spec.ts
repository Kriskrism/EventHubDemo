import { test, expect } from '../../../fixtures/authFixture';
import { ListEventsService } from '../../../services/events/listEventsService';
import { getAuthToken } from '../../../resources/utilities/getAuthToken';
test('List Events', async () => {

    const token = getAuthToken();

    const response = await ListEventsService.listEvents(token);

    expect(response.status()).toBe(200);
});