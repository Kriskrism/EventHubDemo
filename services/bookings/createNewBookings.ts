import { APIClient } from "../../apiClient/apiClient";

export class CreateNewBooking{

    static async createNewBooking(token : string, payLoad : any){

        const apiClient = APIClient.getAuthClient(token);
        return (await apiClient).post('/api/bookings', {data:payLoad})

    }
}