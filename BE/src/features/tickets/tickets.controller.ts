import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { TicketsService } from './tickets.service';
import { TicketOptionsDTO } from './dto/ticket-options.dto';

@Controller('api/tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('price')
  public async calculatePriceTicket(@Body() ticketOptions: TicketOptionsDTO) {
    return await this.ticketsService.calculatePriceTicket(ticketOptions);
  }
}
