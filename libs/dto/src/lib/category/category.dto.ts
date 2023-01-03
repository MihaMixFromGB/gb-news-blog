import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Category } from '@gb-news-blog/interfaces';

export class CategoryDto implements Omit<Category, 'id'> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name!: string;
}
