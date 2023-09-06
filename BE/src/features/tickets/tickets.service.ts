import { ticketPrices, ticketTypes } from '../../utils/constants/tickets';
import { TicketOptionsDTO } from './dto/ticket-options.dto';
import { TicketsServiceInterface } from './interfaces/tickets-service.interface';

export class TicketsService implements TicketsServiceInterface {
  private calculateNrDays(ticket: TicketOptionsDTO): number {
    const arriveDate = new Date(ticket.arriveDate);
    const untilDate = new Date(ticket.untilDate);

    if (untilDate < arriveDate) {
      throw new Error('Invalid dates');
    }

    return (
      (untilDate.getTime() - arriveDate.getTime()) / (1000 * 3600 * 24) + 1
    );
  }
  public async calculatePriceTicket(ticket: TicketOptionsDTO): Promise<number> {
    const nrDays = this.calculateNrDays(ticket);

    switch (ticket.optionType) {
      case ticketTypes.guest:
        return ticketPrices.baseGuestTicketPrice * ticket.nrPersons * nrDays;
      case ticketTypes.fisher:
        return ticketPrices.baseFisherTicketPrice * ticket.nrPersons * nrDays;
      case ticketTypes.camper:
        return ticketPrices.baseCamperTicketPrice * ticket.nrPersons * nrDays;
      default:
        throw new Error('Invalid option type');
    }
  }
}
