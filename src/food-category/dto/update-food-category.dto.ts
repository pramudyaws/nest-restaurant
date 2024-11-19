import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const UpdateFoodCategorySchema = z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }).default("Food category 1 updated").optional(),
});

export class UpdateFoodCategoryDto extends createZodDto(UpdateFoodCategorySchema) { }
