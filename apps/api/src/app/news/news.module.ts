import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsEntity } from '@gb-news-blog/entities';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),
    UsersModule,
    CategoriesModule,
    CommentsModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
