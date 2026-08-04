import { APIClient } from "../../apiClient/apiClient";
import { BookingEventFactory } from "../../resources/data/BookingFactory";

type BookingPayload = ReturnType<typeof BookingEventFactory.createBooking>;

export class CreateNewBooking{

    static async createNewBooking(token : string, payLoad : BookingPayload){

        const apiClient = APIClient.getAuthClient(token);
        return (await apiClient).post('/api/bookings', {data:payLoad})

    }
}