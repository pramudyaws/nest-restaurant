import { Controller, Get, Post, Body, Param, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { Order } from './entities/order.entity';

@Controller('api/v1/orders')
@ApiTags("Order Management")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @Post()
    @Roles(['admin', 'user'])
    async create(@Body() createOrderDto: CreateOrderDto): Promise<ResponseDto<Order>> {
        const order = await this.orderService.create(createOrderDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Order created successfully',
            data: order,
        };
    }

    @Get()
    @Roles(['admin', 'user'])
    async findAll(@Req() req: any): Promise<ResponseDto<Order[]>> {
        const orders = await this.orderService.findAll(req.user);
        return {
            statusCode: HttpStatus.OK,
            message: 'Orders retrieved successfully',
            data: orders,
        };
    }

    @Get(':id')
    @Roles(['admin', 'user'])
    async findOne(@Param('id') id: string) {
        return this.orderService.findOne(+id);
    }
}
