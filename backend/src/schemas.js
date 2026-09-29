import { z } from "zod";

export const reviewSchema = z.object({
  language: z.string().min(1).max(40),
  code: z.string().min(1).max(100000)
});
