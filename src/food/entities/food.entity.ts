import { FoodCategory } from "src/food-category/entities/food-category.entity";
import { BaseEntity } from "src/shared/entities/base.entity";
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'foods' })
export class Food extends BaseEntity { 
    @Column({ unique: true })
    name: string;

    @ManyToOne(() => FoodCategory, (foodCategory) => foodCategory.foods)
    @JoinColumn({ name: 'foodCategoryId' })
    foodCategory: FoodCategory;

    @Column()
    price: number;
}
