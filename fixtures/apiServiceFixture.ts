import { test as authTest } from './authFixture';

export const test = authTest.extend({
  eventService: async ({ authenticatedRequest }, use) => {
    await use(new EventService(authenticatedRequest));
  },

  bookingService: async ({ authenticatedRequest }, use) => {
    await use(new BookingService(authenticatedRequest));
  },

  userService: async ({ authenticatedRequest }, use) => {
    await use(new UserService(authenticatedRequest));
  },

  paymentService: async ({ authenticatedRequest }, use) => {
    await use(new PaymentService(authenticatedRequest));
  },
});