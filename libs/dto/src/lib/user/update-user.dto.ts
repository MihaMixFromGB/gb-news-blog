import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { User } from '@gb-news-blog/interfaces';

export class UpdateUserDto implements Partial<User> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  role?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  avatar?: string;
}
