import { APIClient } from "../../apiClient/apiClient";
import { EventFactory } from "../../resources/data/EventFactory";

type EventPayload = ReturnType<typeof EventFactory.create>;


export class CreateEvent {
    static async createNewEvent(token: string, payLoad: EventPayload) {
        const authClientValid = await APIClient.getAuthClient(token);

        return await authClientValid.post('/api/events', { data: payLoad })

    }

    static async createNewEventWithValidationError(token: string, payLoad: Partial<EventPayload>) {
        const authClientValid = await APIClient.getAuthClient(token);

        return await authClientValid.post('/api/events', { data: payLoad })
    }



}