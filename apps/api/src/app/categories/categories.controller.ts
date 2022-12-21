import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CategoryDto } from '@gb-news-blog/dto';
import { CategoryEntity } from '@gb-news-blog/entities';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoriesService.findById(id);
  }

  @Post()
  create(@Body() categoryDto: CategoryDto): Promise<CategoryEntity> {
    return this.categoriesService.create(categoryDto);
  }

  @Patch(':id')
  update(
    @Param() id: number,
    @Body() categoryDto: CategoryDto
  ): Promise<CategoryEntity | null> {
    return this.categoriesService.update(id, categoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<CategoryEntity | null> {
    return this.categoriesService.remove(id);
  }
}
