import { BaseEntity } from 'src/shared/entities/base.entity';
import { User, UserRole } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    totalPrice: number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: OrderItem[];

    @Column()
    userEmail: string;

    @Column()
    userName: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.User,
    })
    userRole: UserRole;
}
