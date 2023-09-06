import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  optionType: string;

  @Column()
  arriveDate: string;

  @Column()
  untilDate: string;

  @Column()
  nrPersons: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.tickets)
  order: Order;
}
