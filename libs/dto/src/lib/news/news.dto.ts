import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { News } from '@gb-news-blog/interfaces';

export class NewsDto implements Omit<News, 'id'> {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  categoryId!: number;

  @IsNumber()
  authorId!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cover?: string;
}
