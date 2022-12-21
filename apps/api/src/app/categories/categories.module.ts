import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from '@gb-news-blog/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  exports: [CategoriesService],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
