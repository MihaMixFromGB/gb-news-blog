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

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@gb-news-blog/dto';
import { UserEntity } from '@gb-news-blog/entities';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('api/users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All users have been successfully found.',
  })
  getAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully found.',
  })
  getById(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dto validation has been failed.',
  })
  create(@Body() userDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(userDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dto validation has been failed.',
  })
  update(
    @Param('id') id: number,
    @Body() userDto: UpdateUserDto
  ): Promise<UserEntity | null> {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully removed.',
  })
  remove(@Param('id') id: number): Promise<UserEntity | null> {
    return this.usersService.remove(id);
  }
}
