import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodCategory } from './entities/food-category.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class FoodCategoryService {
    constructor(
        @InjectRepository(FoodCategory)
        private readonly foodCategoryRepository: Repository<FoodCategory>,
    ) { }
    async create(createFoodCategoryDto: CreateFoodCategoryDto) {
        const nameExist = await this.foodCategoryRepository.exists({ where: { name: createFoodCategoryDto.name } })
        if (nameExist) {
            throw new ConflictException('The food category name already exists');
        }
        const foodCategory = this.foodCategoryRepository.create(createFoodCategoryDto)
        await this.foodCategoryRepository.save(foodCategory)
        return foodCategory;
    }

    async findAll() {
        return await this.foodCategoryRepository.find();
    }

    async findOne(id: number) {
        const foodCategory = await this.foodCategoryRepository.findOne({ where: { id } })
        if (!foodCategory) throw new NotFoundException(`Food category with ID ${id} not found`);
        return foodCategory;
    }

    async update(id: number, updateFoodCategoryDto: UpdateFoodCategoryDto) {
        const foodCategory = await this.foodCategoryRepository.findOne({ where: { id } });
        if (!foodCategory) throw new NotFoundException(`Food category with ID ${id} not found`);

        const { name } = updateFoodCategoryDto;
        if (name) {
            const nameExist = await this.foodCategoryRepository.exists({
                where: { name, id: Not(id) },
            });
            if (nameExist) {
                throw new ConflictException('The food category name already exists');
            }
        }

        Object.assign(foodCategory, updateFoodCategoryDto);
        return await this.foodCategoryRepository.save(foodCategory);
    }

    async remove(id: number) {
        const foodCategory = await this.foodCategoryRepository.findOne({ where: { id } });
        if (!foodCategory) throw new NotFoundException(`Food category with ID ${id} not found`);
        await this.foodCategoryRepository.remove(foodCategory)
    }
}
