import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const LoginUserSchema = z.object({
    email: z.string().trim().email({ message: 'Invalid email format' }).default("user@mail.com"),
    password: z.string().trim().default("password123"),
}).required();

export class LoginUserDto extends createZodDto(LoginUserSchema) { }
