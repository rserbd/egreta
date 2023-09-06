import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TicketDTO {
  @IsNotEmpty()
  @IsString()
  optionType: string;

  @IsNotEmpty()
  @IsDate()
  arriveDate: string;

  @IsNotEmpty()
  @IsDate()
  untilDate: string;

  @IsNotEmpty()
  @IsNumber()
  nrPersons: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
