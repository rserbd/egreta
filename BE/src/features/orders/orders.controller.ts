import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { CartDTO } from '../cart/dto/cart.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { Order } from 'src/entities/Order.entity';

@Controller('api/orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/generate')
  async generateOrder(
    @Body() cart: CartDTO,
    @Req() req: Request,
  ): Promise<any> {
    const loggedUser = await this.authService.findLoggedUser(req);
    return await this.ordersService.generateOrder(cart, loggedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/loggedUserAllOrders')
  async getLoggedUserAllOrders(@Req() req: Request): Promise<Order[]> {
    const loggedUser = await this.authService.findLoggedUser(req);
    return await this.ordersService.getLoggedUserAllOrders(loggedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/allUsersOrders')
  async allUsersOrders(@Req() req: Request): Promise<any> {
    const loggedUser = await this.authService.findLoggedUser(req);
    if (loggedUser.role === 'admin') {
      const orders = await this.ordersService.allUsersOrders();
      const totalIncome = await this.ordersService.calculateTotalIncome(orders);
      return {
        orders: orders,
        totalIncome: totalIncome,
      };
    } else {
      new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:orderId')
  async getUserOrderById(
    @Param('orderId') orderId: string,
    @Req() req: Request,
  ): Promise<Order> {
    const loggedUser = await this.authService.findLoggedUser(req);
    return await this.ordersService.getLoggedUserOrder(orderId, loggedUser);
  }
}
