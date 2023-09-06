import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order.entity';

@Entity()
export class Boat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  optionType: string;

  @Column()
  date: string;

  @Column()
  fromTime: string;

  @Column()
  nrHours: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.tickets)
  order: Order;
}
