import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            const parsed = schema.safeParse(req.body);

            if (!parsed.success) {
                return res.status(400).json({
                    error: "Invalid payload",
                    details: parsed.error.flatten().fieldErrors
                });
            }

            req.body = parsed.data;
            next();
        };
