import { BaseEntity } from "src/shared/entities/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;
    
    @Column({ type: 'timestamptz', nullable: true })
    lastLoginAt: Date;
}
