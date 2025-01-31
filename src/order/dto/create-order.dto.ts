import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const OrderItemSchema = z.object({
    foodId: z.number().min(1),
    quantity: z.number().min(1, 'Minimum quantity is 1'),
});

const CreateOrderSchema = z.object({
    userId: z.number().min(1).default(1),
    orderItems: z
        .array(OrderItemSchema)
        .nonempty('At least orderItems has one item')
        .default([
            { foodId: 1, quantity: 2 },
            { foodId: 2, quantity: 3 },
        ]),
});

export class CreateOrderDto extends createZodDto(CreateOrderSchema) {}
