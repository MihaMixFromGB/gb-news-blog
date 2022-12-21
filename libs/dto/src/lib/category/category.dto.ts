import { IsString, IsNotEmpty } from 'class-validator';

import { Category } from '@gb-news-blog/interfaces';

export class CategoryDto implements Omit<Category, 'id'> {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
