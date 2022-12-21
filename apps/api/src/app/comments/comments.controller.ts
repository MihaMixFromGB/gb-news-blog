import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CommentDto } from '@gb-news-blog/dto';
import { CommentEntity } from '@gb-news-blog/entities';
// import { HelperFileLoader } from '../../utils/HelperFileLoader';

// const PATH_COMMENTS = '/images/';
// const helperFileLoader = new HelperFileLoader();
// helperFileLoader.path = PATH_COMMENTS;
@Controller('news/:newsId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  async getAllComments(
    @Param('newsId') newsId: number
  ): Promise<CommentEntity[]> {
    return this.commentsService.findAllByNews(newsId);
  }

  @Get(':commentId')
  async getById(@Param('commentId') commentId: number): Promise<CommentEntity> {
    return this.commentsService.findById(commentId);
  }

  @Post()
  async create(@Body() commentDto: CommentDto): Promise<CommentEntity | null> {
    return this.commentsService.create(commentDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() commentDto: CommentDto
  ): Promise<CommentEntity | null> {
    return this.commentsService.update(id, commentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<CommentEntity | null> {
    return this.commentsService.remove(id);
  }
}
