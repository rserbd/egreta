import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsModule } from './features/tickets/tickets.module';
import { BoatsModule } from './features/boats/boats.module';
import { AuthModule } from './features/auth/auth.module';
import { OrdersModule } from './features/orders/orders.module';
import { PdfModule } from './features/pdf/pdf.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'fish_project',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TicketsModule,
    BoatsModule,
    AuthModule,
    OrdersModule,
    PdfModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
