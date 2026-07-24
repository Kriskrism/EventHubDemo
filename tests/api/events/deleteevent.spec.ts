import { DeleteEvent } from "../../../services/events/deleteEvent";
import { CreateEvent } from "../../../services/events/createNewEvent";
import { test, expect } from '../../../fixtures/authFixture';
import { deleteEventSchema } from "../../../apiJSONSchema/event/deleteEvent.schema";
import { EventFactory } from "../../../resources/data/EventFactory";
import { getAuthToken } from '../../../resources/utilities/getAuthToken';

test.describe('Verify the delete operation',  () => {

    const token = getAuthToken()
    let eventID: number;
    const createEventData = EventFactory.create();

    test.beforeAll('Create a new event', async () => {
        const createResponse = await CreateEvent.createNewEvent(token, createEventData);
        const createBody = await createResponse.json();
        eventID = await createBody.data.id;
    })

    test("Verify delete operation for a valid event id", async () => {

        const deleteResponse = await DeleteEvent.deleteEvent(token, eventID);
        const deleteBody = await deleteResponse.json();

        await expect(deleteResponse.status()).toBe(200)
        await expect(deleteBody.message).toBe("Event deleted successfully")

        //validate the schema
        deleteEventSchema.validResponse.parse(deleteBody)
    })


    //Event not found
    test('Verify delete event not found', async()=>{
        
                const invalidEventId = eventID + 10;
                const deleteResponse = await DeleteEvent.deleteEvent(token, invalidEventId);
                const body = await deleteResponse.json();
        
                await expect(deleteResponse.status()).toBe(404)
                await expect(body.error).toBe(`Event with id ${invalidEventId} not found`)
        
                //validate the schema for invalid event creation
                deleteEventSchema.unauthorizedResponse.parse(body)
            })

       //Verify unauthorized access
           test('Verify unauthorized access', async () => {
               const deleteResponse = await DeleteEvent.getDeleteEventWithNoAuth(token, eventID)
               const body = await deleteResponse.json();
       
               await expect(deleteResponse.status()).toBe(401)
               await expect(body.error).toBe('Unauthorized')
       
               //validate the schema for invalid event creation
               deleteEventSchema.unauthorizedResponse.parse(body)
           })

    

})