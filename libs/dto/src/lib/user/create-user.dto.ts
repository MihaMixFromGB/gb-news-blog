import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from 'libs/interfaces/src';

export class CreateUserDto implements Pick<User, 'email' | 'password'> {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password!: string;
}
