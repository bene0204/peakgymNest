import { IsString, IsNotEmpty } from 'class-validator';

export class PayloadDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
