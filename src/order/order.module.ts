import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Food } from 'src/food/entities/food.entity';
import { User } from 'src/user/entities/user.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderItem, Food, User]),
        NotificationModule,
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
