import { Order } from 'src/order/entities/order.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.User,
    })
    role: UserRole;

    @Column({ type: 'timestamptz', nullable: true })
    lastLoginAt: Date;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];
}
