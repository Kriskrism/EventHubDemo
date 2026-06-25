import { APIClient } from "../../apiClient/apiClient";

export class ListSingleEvent {
    static async getSingleEvent(token: string, eventId: number) {
        const authClient = await APIClient.getAuthClient(token);
        return await authClient.get(`/api/events/${eventId}`)
    }

    //verify the authorization fails when no token is passed
    static async getSingleEventWithNoAuth(token: string, eventId: number) {
        const noAuthclient = await APIClient.getClient()
        return await noAuthclient.get(`/api/events/${eventId}`)
    }

    //verify the authorization fails when invalid token is passed
    static async getSingleEventWithInvalidAuth(token: string, eventId: number) {
        const invalidAuthclient = await APIClient.getInvalidAuthClient(token)
        return await invalidAuthclient.get(`/api/events/${eventId}`)
    }


}