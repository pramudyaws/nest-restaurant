import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initializeSwagger } from './shared/configs/swagger.config';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    patchNestJsSwagger();
    const port = configService.get<number>('PORT') || 3000;

    // Initialize Swagger API Docs
    initializeSwagger(app);

    await app.listen(port);
}
bootstrap();
