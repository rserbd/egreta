import { Injectable } from '@nestjs/common';
import { CartDTO } from '../cart/dto/cart.dto';
import { User } from 'src/entities/user.entity';
import { TicketsService } from '../tickets/tickets.service';
import { BoatsService } from '../boats/boats.service';
import { Order } from 'src/entities/Order.entity';
import { Boat } from 'src/entities/boat.entity';
import { Ticket } from 'src/entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    private ticketsService: TicketsService,
    private boatsService: BoatsService,
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    @InjectRepository(Boat) private boatRepository: Repository<Boat>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  public async generateOrder(cart: CartDTO, user: User): Promise<any> {
    const order = new Order();
    order.purchasedOn = new Date().toISOString();
    order.user = user;
    order.tickets = [];
    order.boats = [];

    const tickets = cart.tickets;
    let ticketsTotalPrice = 0;
    for (const ticket of tickets) {
      const ticketOptions = {
        optionType: ticket.optionType,
        arriveDate: ticket.arriveDate,
        untilDate: ticket.untilDate,
        nrPersons: ticket.nrPersons,
      };

      ticket.price = await this.ticketsService.calculatePriceTicket(
        ticketOptions,
      );
      ticket.arriveDate = ticket.arriveDate.slice(0, 10);
      ticket.untilDate = ticket.untilDate.slice(0, 10);

      ticketsTotalPrice = ticketsTotalPrice + ticket.price;
      const newTicket = Object.assign(new Ticket(), ticket);
      await this.ticketRepository.save(newTicket);
      order.tickets.push(newTicket);
    }

    const boats = cart.boats;
    let boatsTotalPrice = 0;
    for (const boat of boats) {
      const boatOptions = {
        optionType: boat.optionType,
        nrHours: boat.nrHours,
      };

      boat.price = await this.boatsService.calculatePriceBoat(boatOptions);
      boat.date = boat.date.slice(0, 10);

      boatsTotalPrice = boatsTotalPrice + boat.price;
      const newBoat = Object.assign(new Boat(), boat);
      await this.boatRepository.save(newBoat);
      order.boats.push(newBoat);
    }

    order.totalPrice = ticketsTotalPrice + boatsTotalPrice;
    return await this.orderRepository.save(order);
  }

  public async getLoggedUserOrder(orderId: string, user: User): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
        user: user,
      },
      relations: ['tickets', 'boats', 'user'],
    });

    return order;
  }

  public async getLoggedUserAllOrders(user: User): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: {
        user: user,
      },
      order: {
        purchasedOn: 'DESC',
      },
    });
    return orders;
  }

  public async allUsersOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      order: {
        purchasedOn: 'DESC',
      },
      relations: ['user'],
    });
  }

  public async calculateTotalIncome(orders: Order[]): Promise<any> {
    let totalIncomeAllTime = 0;
    let totalIncomeCurrentMonth = 0;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    orders.map((order) => {
      const orderDate = new Date(order.purchasedOn);
      totalIncomeAllTime += order.totalPrice;

      if (
        orderDate.getFullYear() === currentYear &&
        orderDate.getMonth() === currentMonth
      ) {
        totalIncomeCurrentMonth += order.totalPrice;
      }
    });

    return { totalIncomeAllTime, totalIncomeCurrentMonth };
  }
}
