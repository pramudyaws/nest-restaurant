import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const CreateFoodSchema = z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }).default("Food 1"),
    foodCategoryId: z.number().default(1),
    price: z.number().default(25000),
}).required()

export class CreateFoodDto extends createZodDto(CreateFoodSchema) { }
