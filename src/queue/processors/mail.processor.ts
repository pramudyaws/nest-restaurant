import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailService } from '../../mail/mail.service';
import { QUEUE_CONSTANTS } from 'src/shared/constants/queue.constants';

@Processor(QUEUE_CONSTANTS.SEND_EMAIL)
export class MailConsumer extends WorkerHost {
    constructor(
        private readonly mailService: MailService
    ) {
        super()
    }

    async process(job: Job<any, any, string>): Promise<any> {
        switch (job.name) {
            case QUEUE_CONSTANTS.REGISTRATION_SUCCESS_EMAIL: {
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
