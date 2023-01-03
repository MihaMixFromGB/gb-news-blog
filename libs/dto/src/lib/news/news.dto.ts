import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { News } from '@gb-news-blog/interfaces';

export class NewsDto implements Omit<News, 'id'> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description!: string;

  @IsNumber()
  @ApiProperty()
  categoryId!: number;

  @IsNumber()
  @ApiProperty()
  authorId!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  cover?: string;
}
