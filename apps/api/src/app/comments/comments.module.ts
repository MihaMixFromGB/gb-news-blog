import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentEntity } from '@gb-news-blog/entities';
import { UsersModule } from '../users/users.module';
import { SocketCommentsGateway } from './socket-comments.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), UsersModule],
  exports: [CommentsService],
  controllers: [CommentsController],
  providers: [CommentsService, SocketCommentsGateway],
})
export class CommentsModule {}
