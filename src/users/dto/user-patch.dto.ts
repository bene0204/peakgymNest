import {
  IsString,
  IsEmail,
  Length,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @Length(7)
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsNumber()
  @IsOptional()
  balance: number;

  @IsArray()
  @IsOptional()
  memberShip: {
    starts: Date;
    expires: Date;
    name: string;
    occassionsLeft: number;
  }[];
}
