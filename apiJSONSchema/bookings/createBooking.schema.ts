import { z } from "zod";

export const BookingResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number(),
    eventId: z.number(),
    customerName: z.string(),
    customerEmail: z.email(),
    customerPhone: z.string(),
    quantity: z.number(),
    totalPrice: z.string(),
    status: z.string(),
    bookingRef: z.string(),
    createdAt: z.iso.datetime(),
    updatedAt: z.string().datetime(),

    event: z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      category: z.string(),
      venue: z.string(),
      city: z.string(),
      eventDate: z.iso.datetime(),
      price: z.string(),
      totalSeats: z.number(),
      availableSeats: z.number(),
      imageUrl: z.url(),
      createdAt: z.iso.datetime(),
      updatedAt: z.iso.datetime(),
    }),
  }),
  message: z.string(),
});

