import { APIClient } from "../../apiClient/apiClient";

export class DeleteBooking{

    static async deleteBooking(token : string, bookingId : number){
        const apiClient = await APIClient.getAuthClient(token);
        return apiClient.delete(`/api/bookings/${bookingId}`)

    }

}