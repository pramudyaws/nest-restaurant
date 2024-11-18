import { BaseEntity } from "src/shared/entities/base.entity";
import { Entity, Column } from "typeorm";

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
}
