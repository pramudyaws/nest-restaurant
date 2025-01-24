import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { FoodCategoryService } from './food-category.service';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food-category.dto';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { FoodCategory } from './entities/food-category.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/food-categories')
@ApiTags('Food Category Management')
export class FoodCategoryController {
    constructor(private readonly foodCategoryService: FoodCategoryService) {}

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(['admin'])
    async create(
        @Body() createFoodCategoryDto: CreateFoodCategoryDto,
    ): Promise<ResponseDto<FoodCategory>> {
        const foodCategory = await this.foodCategoryService.create(
            createFoodCategoryDto,
        );
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(['admin'])
    async update(
        @Param('id') id: string,
        @Body() updateFoodCategoryDto: UpdateFoodCategoryDto,
    ): Promise<ResponseDto<FoodCategory>> {
        const updatedFoodCategory = await this.foodCategoryService.update(
            +id,
            updateFoodCategoryDto,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Food category updated successfully',
            data: updatedFoodCategory,
        };
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(['admin'])
    async remove(@Param('id') id: string): Promise<ResponseDto<null>> {
        await this.foodCategoryService.remove(+id);
        return {
            statusCode: HttpStatus.OK,
            message: `Food category with ID ${id} removed successfully`,
            data: null,
        };
    }
}
