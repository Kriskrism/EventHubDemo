import { APIClient } from "../../apiClient/apiClient";

export class DeleteEvent {

    static async deleteEvent(token: string, eventId: number) {
        const apiClient = await APIClient.getAuthClient(token);
        return await apiClient.delete(`/api/events/${eventId}`)

    }
    //no auth
    static async getDeleteEventWithNoAuth(token: string, eventId: number) {
        const noAuthclient = await APIClient.getClient()
        return await noAuthclient.delete(`/api/events/${eventId}`)
    }
}