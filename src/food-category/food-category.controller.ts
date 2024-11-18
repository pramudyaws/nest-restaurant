import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { FoodCategoryService } from './food-category.service';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food-category.dto';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { FoodCategory } from './entities/food-category.entity';

@Controller('api/v1/food-categories')
export class FoodCategoryController {
    constructor(private readonly foodCategoryService: FoodCategoryService) { }

    @Post()
    async create(@Body() createFoodCategoryDto: CreateFoodCategoryDto): Promise<ResponseDto<FoodCategory>> {
        const foodCategory = await this.foodCategoryService.create(createFoodCategoryDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Food category created successfully',
            data: foodCategory,
        };
    }

    @Get()
    async findAll(): Promise<ResponseDto<FoodCategory[]>> {
        const foodCategories = await this.foodCategoryService.findAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Food categories retrieved successfully',
            data: foodCategories,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ResponseDto<FoodCategory>> {
        const foodCategory = await this.foodCategoryService.findOne(+id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Food category retrieved successfully',
            data: foodCategory,
        };
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateFoodCategoryDto: UpdateFoodCategoryDto,
    ): Promise<ResponseDto<FoodCategory>> {
        const updatedFoodCategory = await this.foodCategoryService.update(+id, updateFoodCategoryDto);
        return {
            statusCode: HttpStatus.OK,
            message: 'Food category updated successfully',
            data: updatedFoodCategory,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<ResponseDto<null>> {
        await this.foodCategoryService.remove(+id);
        return {
            statusCode: HttpStatus.OK,
            message: `Food category with ID ${id} removed successfully`,
            data: null,
        };
    }
}
