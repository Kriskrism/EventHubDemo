import { APIClient } from "../../apiClient/apiClient";


export class CreateEvent {
    static async createNewEvent(token: string, payLoad: any) {
        const authClientValid = await APIClient.getAuthClient(token);

        return await authClientValid.post('/api/events', { data: payLoad })

    }

    static async createNewEventWithValidationError(token: string, payLoad: any) {
        const authClientValid = await APIClient.getAuthClient(token);

        return await authClientValid.post('/api/events', { data: payLoad })
    }



}