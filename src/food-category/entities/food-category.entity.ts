import { Food } from "src/food/entities/food.entity";
import { BaseEntity } from "src/shared/entities/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: 'food_categories' })
export class FoodCategory extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @OneToMany(() => Food, (food) => food.foodCategory)
    foods: Food[];
}
