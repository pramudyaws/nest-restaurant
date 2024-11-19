import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const LoginUserSchema = z.object({
    email: z.string().trim().email({ message: 'Invalid email format' }),
    password: z.string().trim(),
}).required();

export class LoginUserDto extends createZodDto(LoginUserSchema) { }
