import { email, z } from "zod"

export const userValidator = z.object({
    email: z.string().trim().email(),
    password: z.string().min(6, "Password must be at least 6 characters")
});