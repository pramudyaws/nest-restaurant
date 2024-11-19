import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Food } from './entities/food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodCategory } from 'src/food-category/entities/food-category.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Food, FoodCategory])
    ],
    controllers: [FoodController],
    providers: [FoodService],
})
export class FoodModule { }
