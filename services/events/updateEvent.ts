import { APIClient } from "../../apiClient/apiClient";
import { EventFactory } from "../../resources/data/EventFactory";

type EventPayload = Partial<ReturnType<typeof EventFactory.create>>;

export class UpdateSingleEvent{

    static async updateSingleEvent(token : string, eventId : number,payLoad : EventPayload ){
        const apiClient = await APIClient.getAuthClient(token);
        return await apiClient.put(`/api/events/${eventId}` , {data : payLoad})

    }

    static async getUpdateEventWithNoAuth(token: string, eventId: number,payLoad : EventPayload) {
        const noAuthclient = await APIClient.getClient()
        return await noAuthclient.put(`/api/events/${eventId}` , {data : payLoad})
    }
}
