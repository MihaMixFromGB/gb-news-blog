import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewsDto } from '@gb-news-blog/dto';
import { NewsEntity } from '@gb-news-blog/entities';

import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { CommentsService } from '../comments/comments.service';

import { User } from '@gb-news-blog/interfaces';
import { convertToUserInfo } from '../utils/convertToUserInfo';

const SELECT_FIELDS = [
  'news.id',
  'news.title',
  'news.description',
  'news.cover',
  'news.createdAt',
  'news.updatedAt',
  'users.id',
  'users.firstName',
  'users.lastName',
  'users.email',
  'users.avatar',
  'categories.id',
  'categories.name',
];

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private commentsService: CommentsService
  ) {}

  async findAll(): Promise<NewsEntity[]> {
    return await this.newsRepository
      .createQueryBuilder('news')
      .select(SELECT_FIELDS)
      .leftJoin('news.author', 'users')
      .leftJoin('news.category', 'categories')
      .getMany();
  }

  async findById(id: number): Promise<NewsEntity> {
    return await this.newsRepository
      .createQueryBuilder('news')
      .where({ id })
      .select(SELECT_FIELDS)
      .leftJoin('news.author', 'users')
      .leftJoin('news.category', 'categories')
      .getOne();
  }

  async findByAuthorId(authorId: number): Promise<NewsEntity[]> {
    return await this.newsRepository
      .createQueryBuilder('news')
      .where({ author: { id: authorId } })
      .select(SELECT_FIELDS)
      .leftJoin('news.author', 'users')
      .leftJoin('news.category', 'categories')
      .getMany();
  }

  async create(newsDto: NewsDto): Promise<NewsEntity | null> {
    const author = await this.usersService.findById(newsDto.authorId);
    if (!author) {
      return null;
    }

    const category = await this.categoriesService.findById(newsDto.categoryId);
    if (!category) {
      return null;
    }

    let newNews = new NewsEntity();
    newNews = {
      ...newNews,
      ...newsDto,
      author,
      category,
    };

    newNews = await this.newsRepository.save(newNews);
    newNews.author = convertToUserInfo(newNews.author as User);

    return newNews;
  }

  async update(id: number, newsDto: NewsDto): Promise<NewsEntity | null> {
    const author = await this.usersService.findById(newsDto.authorId);
    if (!author) {
      return null;
    }

    const category = await this.categoriesService.findById(newsDto.categoryId);
    if (!category) {
      return null;
    }

    let updatedNews = await this.findById(id);
    if (!updatedNews) {
      return null;
    }

    updatedNews = {
      ...updatedNews,
      ...newsDto,
      author,
      category,
    };

    updatedNews = await this.newsRepository.save(updatedNews);
    updatedNews.author = convertToUserInfo(updatedNews.author as User);

    return updatedNews;
  }

  async remove(id: number): Promise<NewsEntity | null> {
    let deletedNews = await this.findById(id);
    if (!deletedNews) {
      return null;
    }

    await this.commentsService.removeAllByNews(deletedNews.id);

    deletedNews = await this.newsRepository.remove(deletedNews);
    deletedNews.author = convertToUserInfo(deletedNews.author as User);

    return deletedNews;
  }
}
