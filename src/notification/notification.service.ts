import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationGateway } from './notification.gateway';
import { Notification } from './entities/notification.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly notificationGateway: NotificationGateway,
    ) {}

    async createNotification(
        userId: number,
        message: string,
    ): Promise<Notification> {
        // Save notification to DB
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        const notification = this.notificationRepository.create({
            user,
            message,
        });
        await this.notificationRepository.save(notification);

        // Send notification via WebSocket
        this.notificationGateway.sendNotification(userId, message);

        return notification;
    }
}
