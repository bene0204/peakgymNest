import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

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

  numberOfOccasion?: number;
}
