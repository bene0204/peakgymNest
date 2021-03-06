import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class msDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  numberOfDays: number;

  @IsNumber()
  @IsOptional()
  numberOfOccasion: number;
}
