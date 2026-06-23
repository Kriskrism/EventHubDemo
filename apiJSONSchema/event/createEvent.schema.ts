import { z } from "zod";

export const createeventSchema = {
  validResponse: z.object({
    success: z.literal(true),

    data: z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      category: z.string(),
      venue: z.string(),
      city: z.string(),
      eventDate: z.string(),
      price: z.union([z.string(), z.number()]),
      totalSeats: z.number(),
      availableSeats: z.number(),
      imageUrl: z.string().url(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),

    message: z.string(),
  }),

  invalidResponse: z.object({
    success: z.literal(false),
    error: z.string(),

    details: z.array(
      z.object({
        field: z.string(),
        message: z.string(),
      })
    ),
  }),

  unauthorizedResponse :z.object({
    success: z.literal(false),
    error: z.string(),
  })
};