import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Comment } from '@gb-news-blog/interfaces';

export class CommentDto implements Omit<Comment, 'id'> {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  parentId?: number;

  @IsNumber()
  @ApiProperty()
  newsId!: number;

  @IsNumber()
  @ApiProperty()
  userId!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message!: string;
}
