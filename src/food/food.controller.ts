import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Food } from './entities/food.entity';
import { ResponseDto } from 'src/shared/dto/response.dto';

@Controller('api/v1/foods')
@ApiTags("Food Management")
export class FoodController {
    constructor(private readonly foodService: FoodService) { }

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(['admin'])
    async create(@Body() createFoodDto: CreateFoodDto): Promise<ResponseDto<Food>> {
        const food = await this.foodService.create(createFoodDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Food created successfully',
            data: food,
        };
    }

    @Get()
    async findAll(): Promise<ResponseDto<Food[]>> {
        const foods = await this.foodService.findAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Foods retrieved successfully',
            data: foods,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ResponseDto<Food>> {
        const food = await this.foodService.findOne(+id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Food retrieved successfully',
            data: food,
        };
    }

    @Patch(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(['admin'])
    async update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto): Promise<ResponseDto<Food>> {
        const updatedFood = await this.foodService.update(+id, updateFoodDto);
        return {
            statusCode: HttpStatus.OK,
            message: 'Food updated successfully',
            data: updatedFood,
        };
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(['admin'])
    async remove(@Param('id') id: string): Promise<ResponseDto<null>> {
        await this.foodService.remove(+id);
        return {
            statusCode: HttpStatus.OK,
            message: `Food with ID ${id} removed successfully`,
            data: null,
        };
    }
}
