import {
  Controller,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { OrdersService } from '../orders/orders.service';
import { PdfService } from './pdf.service';

@Controller('api/pdf')
export class PdfController {
  constructor(
    private authService: AuthService,
    private ordersService: OrdersService,
    private pdfService: PdfService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:orderId')
  public async exportOrderPdf(
    @Param('orderId') orderId: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const loggedUser = await this.authService.findLoggedUser(req);
      const order = await this.ordersService.getLoggedUserOrder(
        orderId,
        loggedUser,
      );
      const doc = await this.pdfService.exportPdfOrder(order);
      res.set({
        'Content-Disposition': `attachment;`,
      });
      doc.pipe(res);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/admin/:userId/:orderId')
  public async exportOrderPdfAdmin(
    @Param('userId') userId: string,
    @Param('orderId') orderId: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const loggedUser = await this.authService.findLoggedUser(req);
      if (loggedUser.role !== 'admin') throw new UnauthorizedException();
      const user = await this.authService.findUserById(userId);
      const order = await this.ordersService.getLoggedUserOrder(orderId, user);
      const doc = await this.pdfService.exportPdfOrder(order);
      res.set({
        'Content-Disposition': `attachment;`,
      });
      doc.pipe(res);
    } catch (error) {
      console.error(error);
    }
  }
}
