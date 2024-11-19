import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const CreateFoodCategorySchema = z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }),
}).required()

export class CreateFoodCategoryDto extends createZodDto(CreateFoodCategorySchema) { }
