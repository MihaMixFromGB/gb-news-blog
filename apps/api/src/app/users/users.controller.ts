import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@gb-news-blog/dto';
import { UserEntity } from '@gb-news-blog/entities';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() userDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(userDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() userDto: UpdateUserDto
  ): Promise<UserEntity | null> {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<UserEntity | null> {
    return this.usersService.remove(id);
  }
}
