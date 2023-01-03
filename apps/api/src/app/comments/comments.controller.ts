import {
  Controller,
  Param,
  Body,
  Query,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { CommentsService } from './comments.service';
import { CommentDto, NewsIdDto } from '@gb-news-blog/dto';
import { CommentEntity } from '@gb-news-blog/entities';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { HelperFileLoader } from '../../utils/HelperFileLoader';

// const PATH_COMMENTS = '/images/';
// const helperFileLoader = new HelperFileLoader();
// helperFileLoader.path = PATH_COMMENTS;
@ApiTags('api/comments')
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All comments by newsId have been successfully found.',
  })
  async getAllComments(
    @Query() { newsId }: NewsIdDto
  ): Promise<CommentEntity[]> {
    return this.commentsService.findAllByNews(newsId);
  }

  @Get(':commentId')
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully found.',
  })
  async getById(@Param('commentId') commentId: number): Promise<CommentEntity> {
    return this.commentsService.findById(commentId);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dto validation has been failed.',
  })
  async create(@Body() commentDto: CommentDto): Promise<CommentEntity | null> {
    return this.commentsService.create(commentDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dto validation has been failed.',
  })
  async update(
    @Param('id') id: number,
    @Body() commentDto: CommentDto
  ): Promise<CommentEntity | null> {
    return this.commentsService.update(id, commentDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully removed.',
  })
  async remove(@Param('id') id: number): Promise<CommentEntity | null> {
    return this.commentsService.remove(id);
  }
}
