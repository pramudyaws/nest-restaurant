import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UpdateUserSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: 'Invalid email format' })
        .default('user@mail.com')
        .optional(),
    password: z
        .string()
        .trim()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .default('password123')
        .optional(),
    name: z
        .string()
        .trim()
        .min(1, { message: 'Name is required' })
        .default('User updated')
        .optional(),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
