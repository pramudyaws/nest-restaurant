import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodCategoryModule } from './food-category/food-category.module';

@Module({
  imports: [FoodCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
