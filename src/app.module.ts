import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodCategoryModule } from './food-category/food-category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './shared/configs/database.config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: databaseConfig,
            inject: [ConfigService],
        }),
        FoodCategoryModule,
        UserModule,
        AuthModule,
        FoodModule,
        OrderModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
        AppService
    ],
})
export class AppModule { }
