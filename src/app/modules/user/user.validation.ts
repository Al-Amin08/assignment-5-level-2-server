import z from "zod";
import { Current_Status, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z
        .string({ error: "Bad" })
        .min(3, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    
    email: z
        .email({ message: "Invalid email address format Error." }),

    password: z
        .string({ error: "Password must be string" }).min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, { message: "Password must contain at least 1 uppercase letter." })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password must contain at least 1 special character." })
        .regex(/^(?=.*\d)/, { message: "Password must contain at least 1 number." }),
    role: z.string(),
    current_status: z.string().optional()
    
})


export const updateUserZodSchema = z.object({
    name: z
        .string({ error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }).optional(),
    password: z
        .string({ error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }).optional(),
    
    role: z
        .enum(Object.values(Role))
        .optional(),
    
    current_status: z
        .enum(Object.values(Current_Status))
        .optional()

})