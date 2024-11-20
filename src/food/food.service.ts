import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { FoodCategory } from 'src/food-category/entities/food-category.entity';

@Injectable()
export class FoodService {
    constructor(
        @InjectRepository(Food)
        private readonly foodRepository: Repository<Food>,
        @InjectRepository(FoodCategory)
        private readonly foodCategoryRepository: Repository<FoodCategory>,
    ) { }
    async create(createFoodDto: CreateFoodDto) {
        const nameExist = await this.foodRepository.exists({ where: { name: createFoodDto.name } })
        if (nameExist) {
            throw new ConflictException('The food name already exists');
        }
        const foodCategory = await this.foodCategoryRepository.findOne({ where: { id: createFoodDto.foodCategoryId } })
        if (!foodCategory) throw new NotFoundException('Food category not found');

        const food = this.foodRepository.create({
            ...createFoodDto,
            foodCategory: { id: createFoodDto.foodCategoryId }
        })
        await this.foodRepository.save(food)
        return food;
    }

    async findAll() {
        return await this.foodRepository.find({
            relations: { foodCategory: true },
            select: { foodCategory: { id: true, name: true } }
        });
    }

    async findOne(id: number) {
        const food = await this.foodRepository.findOne({
            where: { id },
            relations: { foodCategory: true },
            select: { foodCategory: { id: true, name: true } }
        })
        if (!food) throw new NotFoundException(`Food with ID ${id} not found`);
        return food;
    }

    async update(id: number, updateFoodDto: UpdateFoodDto) {
        const food = await this.foodRepository.findOne({ where: { id } })
        if (!food) throw new NotFoundException(`Food with ID ${id} not found`);

        const { name, foodCategoryId } = updateFoodDto;
        if (name) {
            const nameExist = await this.foodRepository.exists({
                where: { name, id: Not(id) },
            });
            if (nameExist) {
                throw new ConflictException('The food name already exists');
            }
        }
        if (foodCategoryId) {
            const foodCategory = await this.foodCategoryRepository.findOne({ where: { id: foodCategoryId } })
            if (!foodCategory) throw new NotFoundException('Food category not found');
        }

        Object.assign(food, updateFoodDto);
        return await this.foodRepository.save(food);
    }

    async remove(id: number) {
        const food = await this.foodRepository.findOne({ where: { id } });
        if (!food) throw new NotFoundException(`Food with ID ${id} not found`);
        await this.foodRepository.remove(food)
    }
}
