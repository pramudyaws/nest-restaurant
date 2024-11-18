import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const UpdateFoodCategorySchema = z.object({
    name: z.string().optional(),
}).required();

export class UpdateFoodCategoryDto extends createZodDto(UpdateFoodCategorySchema) { }
