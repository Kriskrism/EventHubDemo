import { APIClient } from '../../apiClient/apiClient';

export class ListEventsService {

  static async listEvents(token: string) {

    const authclient = await APIClient.getAuthClient(token);

    return await authclient.get('/api/events');
  }
}
