import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Order } from "./order.entity";
import { Food } from "src/food/entities/food.entity";
import { BaseEntity } from "src/shared/entities/base.entity";

@Entity({ name: 'order_items' })
export class OrderItem extends BaseEntity {
    @ManyToOne(() => Order, (order) => order.orderItems)
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @ManyToOne(() => Food, (food) => food.orderItems)
    @JoinColumn({ name: 'foodId' })
    food: Food;

    @Column()
    quantity: number;

    @Column()
    price: number;
}
