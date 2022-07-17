import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class msPatchDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  numberOfDays: number;

  @IsNumber()
  @IsOptional()
  numberOfOccasion: number;
}
