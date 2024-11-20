import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { UserRole } from "../../user/entities/user.entity";

const CreateUserSchema = z.object({
    email: z.string().trim().email({ message: 'Invalid email format' }).default("user@mail.com"),
    password: z.string().trim().min(6, { message: 'Password must be at least 6 characters long' }).default("password123"),
    name: z.string().trim().min(1, { message: 'Name is required' }).default("User"),
    role: z.nativeEnum(UserRole).default(UserRole.User),
}).required();

export class CreateUserDto extends createZodDto(CreateUserSchema) { }
