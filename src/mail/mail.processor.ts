import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailService } from './mail.service';

@Processor('sendEmail')
export class MailConsumer extends WorkerHost {
    constructor(
        private readonly mailService: MailService
    ) {
        super()
    }

    async process(job: Job<any, any, string>): Promise<any> {
        switch (job.name) {
            case 'sendRegisterSuccess': {
                await this.handleRegisterSuccessEmail(job);
                break;
            }
        }
    }

    async handleRegisterSuccessEmail(job: Job) {
        const { email, name } = job.data;
        await this.mailService.sendRegisterSuccess({ email, name } as any);
    }
}
