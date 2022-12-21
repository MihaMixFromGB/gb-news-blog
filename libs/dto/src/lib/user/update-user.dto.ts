import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { User } from '@gb-news-blog/interfaces';

export class UpdateUserDto implements Partial<User> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  role?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  avatar?: string;
}
