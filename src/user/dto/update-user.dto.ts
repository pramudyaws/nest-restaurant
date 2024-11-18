import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const UpdateUserSchema = z.object({
    email: z.string().optional(),
    password: z.string().optional(),
    name: z.string().optional(),
}).required();

export class UpdateUserDto extends createZodDto(UpdateUserSchema) { }
