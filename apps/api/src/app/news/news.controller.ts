import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  // Req,
  // UploadedFile,
  // UseInterceptors,
} from '@nestjs/common';
// import { ApiTags, ApiResponse } from '@nestjs/swagger';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';

import { NewsService } from './news.service';
import { NewsDto } from '@gb-news-blog/dto';
import { NewsEntity } from '@gb-news-blog/entities';

// import { HelperFileLoader } from '../utils/HelperFileLoader';
// import { FileTypeValidator } from '../utils/FileTypeValidator';

// import { MailService } from '../mail/mail.service';

// const PATH_NEWS = '/images/';
// const helperFileLoader = new HelperFileLoader();
// helperFileLoader.path = PATH_NEWS;
// const fileValidator = new FileTypeValidator();
// @ApiTags('api/news')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  // @ApiResponse({
  //   status: 200,
  //   description: 'The news have been successfully found.',
  // })
  async getAll(): Promise<NewsEntity[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  // @ApiResponse({
  //   status: 200,
  //   description: 'The news has been successfully found.',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Internal server error. ID maybe is not correct.',
  // })
  async getById(@Param('id') id: number): Promise<NewsEntity> {
    try {
      return this.newsService.findById(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  // @ApiResponse({
  //   status: 201,
  //   description: 'The news has been successfully created.',
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Data validation has been failed.',
  // })
  async create(@Body() newsDto: NewsDto): Promise<NewsEntity> {
    return this.newsService.create(newsDto);
  }

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: helperFileLoader.destinationPath,
  //       filename: helperFileLoader.customFileName,
  //     }),
  //     fileFilter: fileValidator.fileFilter,
  //   })
  // )
  // async uploadImage(
  //   @Req() req,
  //   @UploadedFile() file: Express.Multer.File
  // ): Promise<string> {
  //   if (req.fileValidationError) {
  //     throw new HttpException(req.fileValidationError, HttpStatus.BAD_REQUEST);
  //   }

  //   return `${file.originalname} has been loaded!`;
  // }

  @Put(':id')
  // @ApiResponse({
  //   status: 200,
  //   description: 'The news has been successfully updated.',
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Data validation has been failed.',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Internal server error. ID maybe is not correct.',
  // })
  async update(
    @Param('id') id: number,
    @Body() newsDto: NewsDto
  ): Promise<NewsEntity> {
    return this.newsService.update(id, newsDto);
  }

  @Delete(':id')
  // @ApiResponse({
  //   status: 200,
  //   description: 'The news has been successfully removed.',
  // })
  async remove(@Param('id') id: number): Promise<NewsEntity | null> {
    return this.newsService.remove(id);
  }
}
