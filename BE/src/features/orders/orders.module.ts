import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/jwt/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { TicketsService } from '../tickets/tickets.service';
import { BoatsService } from '../boats/boats.service';
import { Ticket } from 'src/entities/ticket.entity';
import { Boat } from 'src/entities/boat.entity';
import { Order } from 'src/entities/Order.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User, Ticket, Boat, Order]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    JwtAuthGuard,
    AuthService,
    JwtStrategy,
    TicketsService,
    BoatsService,
  ],
})
export class OrdersModule {}
