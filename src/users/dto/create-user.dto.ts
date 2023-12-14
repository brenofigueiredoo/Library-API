import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  name: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Email must have atleast 6 characters.' })
  email: string;

  @MinLength(3, { message: 'Password must have atleast 3 characters.' })
  @IsNotEmpty()
  password: string;
}
