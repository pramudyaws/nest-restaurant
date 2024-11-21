import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendRegisterSuccess(user: { email: string; name: string }) {
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
