import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@gb-news-blog/entities';
import { CreateUserDto, UpdateUserDto } from '@gb-news-blog/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ email });
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    let newUser = new UserEntity();
    newUser = {
      ...newUser,
      ...userDto,
      role: 'user',
    };

    return await this.usersRepository.save(newUser);
  }

  async update(id: number, userDto: UpdateUserDto): Promise<UserEntity | null> {
    let updatedUser = await this.findById(id);
    if (!updatedUser) {
      return null;
    }

    updatedUser = {
      ...updatedUser,
      ...userDto,
    };

    return await this.usersRepository.save(updatedUser);
  }

  async remove(id: number): Promise<UserEntity | null> {
    const deletedUser = await this.findById(id);
    if (!deletedUser) {
      return null;
    }

    return await this.usersRepository.remove(deletedUser);
  }
}
