import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const UpdateFoodSchema = z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }).default("Food 1 updated").optional(),
    foodCategoryId: z.number().default(1).optional(),
    price: z.number().min(0).default(30000).optional(),
});

export class UpdateFoodDto extends createZodDto(UpdateFoodSchema) { }
