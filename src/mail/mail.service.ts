import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendRegisterSuccess(user: User) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Nest Restaurant API!',
            template: './registration-success',
            context: {
                name: user.name,
            },
        });
    }
}
