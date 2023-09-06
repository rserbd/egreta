import { TicketOptionsDTO } from '../dto/ticket-options.dto';

export interface TicketsServiceInterface {
  calculatePriceTicket(ticketOptions: TicketOptionsDTO): Promise<number>;
}
