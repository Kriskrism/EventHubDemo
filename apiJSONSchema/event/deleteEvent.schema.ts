import {z} from "zod"

export const deleteEventSchema = {
    validResponse :z.object({
    success: z.literal(true),
    message: z.string(),
  }),

  unauthorizedResponse :z.object({
    success: z.literal(false),
    error: z.string(),
  }),

  eventNotFound :z.object({
    success: z.literal(false),
    error: z.string(),
  })
}