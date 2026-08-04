import { APIClient } from "../../apiClient/apiClient";

export class RetreiveByRefCode{

    static async getByRefCode(token : string, bookingRef : string){

        const apiClient = await APIClient.getAuthClient(token);
        return await apiClient.get(`api/bookings/ref/${bookingRef}`)

    }
}