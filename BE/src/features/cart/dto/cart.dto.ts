import { IsNumber, IsNotEmpty, IsArray } from 'class-validator';
import { BoatDTO } from 'src/features/boats/dto/boat.dto';
import { TicketDTO } from 'src/features/tickets/dto/ticket.dto';

export class CartDTO {
  @IsArray()
  tickets: TicketDTO[];

  @IsArray()
  boats: BoatDTO[];

  @IsNotEmpty()
  @IsNumber()
  count: number;
}
