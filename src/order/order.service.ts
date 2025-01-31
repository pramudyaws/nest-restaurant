import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/food/entities/food.entity';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
        @InjectRepository(Food)
        private readonly foodRepository: Repository<Food>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly notificationService: NotificationService,
    ) {}
    async create(createOrderDto: CreateOrderDto) {
        const { userId, orderItems } = createOrderDto;

        // Validate user
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user)
            throw new NotFoundException(`User with ID ${userId} not found`);

        // Validate food
        const foodIds = orderItems.map((item) => item.foodId);
        const validFoods = await this.foodRepository.find({
            where: { id: In(foodIds) },
            relations: { foodCategory: true },
        });
        if (validFoods.length !== foodIds.length) {
            const invalidFoodIds = foodIds.filter(
                (foodId) =>
                    !validFoods.some((validFood) => validFood.id === foodId),
            );
            throw new NotFoundException(
                `Food(s) with ID(s) ${invalidFoodIds.join(', ')} not found`,
            );
        }

        // Calculate total price
        let totalPrice = 0;
        const orderItemsToSave = orderItems.map((item) => {
            const food = validFoods.find((f) => f.id === item.foodId);
            const itemTotalPrice = food.price * item.quantity;
            totalPrice += itemTotalPrice;

            return this.orderItemRepository.create({
                food,
                foodName: food.name,
                foodPrice: food.price,
                foodCategoryName: food.foodCategory.name,
                quantity: item.quantity,
            });
        });

        const order = this.orderRepository.create({
            user,
            totalPrice,
            userEmail: user.email,
            userName: user.name,
            userRole: user.role,
        });
        let savedOrder = await this.orderRepository.save(order);

        for (const orderItem of orderItemsToSave) {
            orderItem.order = savedOrder;
        }
        await this.orderItemRepository.save(orderItemsToSave);

        savedOrder = await this.orderRepository.findOne({
            where: { id: savedOrder.id },
            relations: {
                user: true,
                orderItems: { food: { foodCategory: true } },
            },
            select: { user: { id: true, email: true, name: true } },
        });

        // Create notification
        await this.notificationService.createNotification(
            userId,
            `Your order #${savedOrder.id} has been created successfully!`,
        );

        return savedOrder;
    }

    async findAll(requester: any) {
        const where =
            requester.role === 'admin' ? {} : { user: { id: requester.id } };
        return await this.orderRepository.find({
            where,
            relations: {
                user: true,
                orderItems: { food: { foodCategory: true } },
            },
            select: { user: { id: true, email: true, name: true } },
        });
    }

    async findOne(requester: any, id: number) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: {
                user: true,
                orderItems: { food: { foodCategory: true } },
            },
            select: { user: { id: true, email: true, name: true } },
        });
        if (requester.role === 'user' && requester.id !== order.user.id) {
            throw new ForbiddenException(
                'You are not allowed to retrieve this order data',
            );
        }
        return order;
    }
}
