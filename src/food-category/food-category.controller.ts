import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodCategoryService } from './food-category.service';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food-category.dto';

@Controller('food-categories')
export class FoodCategoryController {
    constructor(private readonly foodCategoryService: FoodCategoryService) { }

    @Post()
    async create(@Body() createFoodCategoryDto: CreateFoodCategoryDto) {
        return await this.foodCategoryService.create(createFoodCategoryDto);
    }

    @Get()
    async findAll() {
        return await this.foodCategoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.foodCategoryService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateFoodCategoryDto: UpdateFoodCategoryDto) {
        return await this.foodCategoryService.update(+id, updateFoodCategoryDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.foodCategoryService.remove(+id);
    }
}
