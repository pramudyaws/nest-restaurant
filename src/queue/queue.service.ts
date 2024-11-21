import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { QUEUE_CONSTANTS } from "src/shared/constants/queue.constants";

@Injectable()
export class QueueService {
    constructor(
        @InjectQueue(QUEUE_CONSTANTS.SEND_EMAIL)
        private readonly sendEmailQueue: Queue
    ) { }

    async sendEmailRegistrationSuccess(email: string, name: string) {
        await this.sendEmailQueue.add(QUEUE_CONSTANTS.REGISTRATION_SUCCESS_EMAIL, {
            email: email,
            name: name
        });
    }
}