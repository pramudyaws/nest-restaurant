import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { UserRole } from "../../user/entities/user.entity";

const CreateUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    name: z.string().min(1, { message: 'Name is required' }),
    role: z.nativeEnum(UserRole).default(UserRole.User),
}).required();

export class CreateUserDto extends createZodDto(CreateUserSchema) { }
