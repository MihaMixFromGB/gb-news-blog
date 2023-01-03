import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CategoryDto } from '@gb-news-blog/dto';
import { CategoryEntity } from '@gb-news-blog/entities';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('api/categories')
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All categories have been successfully found.',
  })
  getAll(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully found.',
  })
  getById(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoriesService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dto validation has been failed.',
  })
  create(@Body() categoryDto: CategoryDto): Promise<CategoryEntity> {
    return this.categoriesService.create(categoryDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dto validation has been failed.',
  })
  update(
    @Param() id: number,
    @Body() categoryDto: CategoryDto
  ): Promise<CategoryEntity | null> {
    return this.categoriesService.update(id, categoryDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully removed.',
  })
  remove(@Param('id') id: number): Promise<CategoryEntity | null> {
    return this.categoriesService.remove(id);
  }
}
