import { Module } from '@nestjs/common';
import { FoodCategoryService } from './food-category.service';
import { FoodCategoryController } from './food-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodCategory } from './entities/food-category.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([FoodCategory])
    ],
    controllers: [FoodCategoryController],
    providers: [FoodCategoryService],
})
export class FoodCategoryModule { }
