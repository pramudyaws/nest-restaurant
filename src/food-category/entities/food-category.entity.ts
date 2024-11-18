import { BaseEntity } from "src/shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'food_categories' })
export class FoodCategory extends BaseEntity {
    @Column({ unique: true })
    name: string;
}
