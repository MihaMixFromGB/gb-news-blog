import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Comment } from '@gb-news-blog/interfaces';

export class CommentDto implements Omit<Comment, 'id'> {
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsNumber()
  newsId!: number;

  @IsNumber()
  userId!: number;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
