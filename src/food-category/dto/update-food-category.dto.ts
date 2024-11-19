import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const UpdateFoodCategorySchema = z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }).optional(),
});

export class UpdateFoodCategoryDto extends createZodDto(UpdateFoodCategorySchema) { }
