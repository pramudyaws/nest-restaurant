import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const CreateFoodCategorySchema = z.object({
    name: z.string()
}).required()

export class CreateFoodCategoryDto extends createZodDto(CreateFoodCategorySchema) { }
