import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const CreateUserSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
}).required()

export class CreateUserDto extends createZodDto(CreateUserSchema) { }
