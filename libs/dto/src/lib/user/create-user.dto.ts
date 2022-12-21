import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'libs/interfaces/src';

export class CreateUserDto implements Pick<User, 'email' | 'password'> {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
