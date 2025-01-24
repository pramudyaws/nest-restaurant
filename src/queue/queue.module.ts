import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { MailConsumer } from './processors/mail.processor';
import { MailModule } from 'src/mail/mail.module';
import { QUEUE_CONSTANTS } from 'src/shared/constants/queue.constants';

@Global()
@Module({
    imports: [
        BullModule.registerQueue({
            name: QUEUE_CONSTANTS.SEND_EMAIL,
        }),
        MailModule,
    ],
    providers: [QueueService, MailConsumer],
    exports: [QueueService],
})
export class QueueModule {}
