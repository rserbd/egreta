import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TicketOptionsDTO {
  @IsString()
  @IsNotEmpty()
  optionType: string;

  @IsString()
  @IsNotEmpty()
  arriveDate: string;

  @IsString()
  @IsNotEmpty()
  untilDate: string;

  @IsNumber()
  @IsNotEmpty()
  nrPersons: number;
}
