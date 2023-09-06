import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { AuthService } from '../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { jwtConstants } from '../auth/jwt/constants';
import { PassportModule } from '@nestjs/passport';
import { OrdersService } from '../orders/orders.service';
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
  controllers: [PdfController],
  providers: [
    PdfService,
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    OrdersService,
    TicketsService,
    BoatsService,
  ],
})
export class PdfModule {}
