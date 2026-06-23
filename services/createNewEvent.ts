import { APIClient } from "../apiClient/apiClient";
import testData from "../resources/utilities/apiTestData/createEventAPIData.json"




export class createEvent {
    static async createNewEvent(token: string) {
        const authClientValid = await APIClient.getAuthClient(token);

        return await authClientValid.post('/api/events', { data: testData.createEventValid })

    }

    static async createNewEventWithValidationError(token : string){
        const authClientValid = await APIClient.getAuthClient(token);

        return await authClientValid.post('/api/events', { data: testData.createEventInValid })
    }

    

}