import { z } from "zod";

export const depositZodSchema = z.object({
  amount: z.number().positive()
});

export const withdrawZodSchema = z.object({
  amount: z.number().positive()
});

export const transferZodSchema = z.object({
  receiver_Email: z.email(),
  amount: z.number().positive()
});

export const agentCashZodSchema = z.object({
  userEmail: z.email(),
  amount: z.number().positive()
});