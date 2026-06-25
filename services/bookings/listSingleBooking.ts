import { APIClient } from "../../apiClient/apiClient";

export class ListSingleBooking {

    //retreive details using a single booking id
    static async getSingleBookingID(token: string, bookingId: number) {
        const authClient = await APIClient.getAuthClient(token)
        return await authClient.get(`api/bookings/${bookingId}`)
    }


}