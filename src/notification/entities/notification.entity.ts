import { BaseEntity } from 'src/shared/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('notifications')
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.notifications, {
        onDelete: 'CASCADE',
    })
    user: User;

    @Column()
    message: string;

    @Column({ default: false })
    isRead: boolean;
}
