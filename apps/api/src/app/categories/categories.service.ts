import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryDto } from '@gb-news-blog/dto';
import { CategoryEntity } from '@gb-news-blog/entities';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoriesRepository.find();
  }

  async findById(id: number): Promise<CategoryEntity> {
    return await this.categoriesRepository.findOneBy({ id });
  }

  async create(categoryDto: CategoryDto): Promise<CategoryEntity> {
    let newCategory = new CategoryEntity();
    newCategory = {
      ...newCategory,
      ...categoryDto,
    };

    return await this.categoriesRepository.save(newCategory);
  }

  async update(
    id: number,
    categoryDto: CategoryDto
  ): Promise<CategoryEntity | null> {
    let updatedCategory = await this.findById(id);
    if (!updatedCategory) {
      return null;
    }

    updatedCategory = {
      ...updatedCategory,
      ...categoryDto,
    };

    return await this.categoriesRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<CategoryEntity | null> {
    const deletedCategory = await this.findById(id);
    if (!deletedCategory) {
      return null;
    }
    return await this.categoriesRepository.remove(deletedCategory);
  }
}
