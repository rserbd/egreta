import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Ticket } from './ticket.entity';
import { Boat } from './boat.entity';
import { generate as generateShortId } from 'short-uuid';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderNumber: string = generateShortId();

  @OneToMany(() => Ticket, (tickets) => tickets.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tickets: Ticket[];

  @OneToMany(() => Boat, (boats) => boats.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  boats: Boat[];

  @Column()
  totalPrice: number;

  @Column()
  purchasedOn: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
