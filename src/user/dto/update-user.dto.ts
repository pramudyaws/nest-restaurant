import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const UpdateUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).optional(),
    name: z.string().min(1, { message: 'Name is required' }).optional(),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) { }
