import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(7)
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  role?: string;
}
