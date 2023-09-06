import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BoatOptionsDTO {
  @IsString()
  @IsNotEmpty()
  optionType: string;

  @IsNumber()
  @IsNotEmpty()
  nrHours: number;
}
