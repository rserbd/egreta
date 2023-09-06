import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BoatDTO {
  @IsNotEmpty()
  @IsString()
  optionType: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsNumber()
  nrHours: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
