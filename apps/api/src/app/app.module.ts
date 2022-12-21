import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';

import {
  UserEntity,
  NewsEntity,
  CategoryEntity,
  CommentEntity,
} from '@gb-news-blog/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, NewsEntity, CategoryEntity, CommentEntity],
      synchronize: true,
    }),
    UsersModule,
    NewsModule,
    CategoriesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
