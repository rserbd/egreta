import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfkit');
import { Order } from 'src/entities/Order.entity';
import {
  FONT,
  FONT_BOLD,
  PDF_DOCUMENT_OPTIONS,
  QR_CODE_SIZE,
} from './pdf-utils/pdf-constants';
import { createCanvas } from 'canvas';
import * as qrCode from 'qrcode';
import * as fs from 'fs';
import * as moment from 'moment';

@Injectable()
export class PdfService {
  public async exportPdfOrder(order: Order): Promise<any> {
    try {
      const qrData = await this.generateQRData(order);
      const qrCodeImagePath = await this.generateQRCode(qrData);

      const doc = new PDFDocument(PDF_DOCUMENT_OPTIONS);

      let totalPages = 1;
      const currentPageNumber = doc.bufferedPageRange().count;
      doc
        .fontSize(10)
        .font(FONT_BOLD)
        .text(`Page ${currentPageNumber}/${totalPages}`, 520, 797, {
          width: 60,
        });
      doc.x = 30;
      doc.y = 30;
      doc.on('pageAdded', () => {
        totalPages++;
        const currentPageNumber = doc.bufferedPageRange().count;

        doc
          .fontSize(10)
          .text(`Page ${currentPageNumber}/${totalPages}`, 520, 797, {
            width: 60,
          });
        doc.x = 30;
        doc.y = 30;
      });

      doc.image('./src/assets/pdf/logo-black.png', {
        width: 100,
        height: 100,
      });

      if (qrCodeImagePath)
        await Promise.resolve(
          doc.image(qrCodeImagePath, {
            x: 455,
            y: 10,
            width: 130,
            height: 130,
          }),
        );
      doc.moveDown(2);

      doc.font(FONT_BOLD).fontSize(24);
      doc.text(`Thank you for choosing Egreta`);
      doc.moveDown(0.5);

      doc.fontSize(20);
      doc.text(`Order nr. #${order.orderNumber}`);
      doc.moveDown(0.3);

      doc.font(FONT).fontSize(16);
      doc.text(`Purchased by ${order.user.firstName} ${order.user.lastName}`);

      doc
        .fontSize(12)
        .text(`on ${moment(order.purchasedOn).format('DD-MM-YYYY, dddd')}`);
      doc.moveDown();

      doc.x = 30;
      doc.font(FONT_BOLD).fontSize(16);
      doc.text('- Tickets');

      if (order.tickets.length > 0) {
        this.displayTickets(doc, order);
      } else {
        doc.text('No tickets purchased');
        doc.moveDown();
      }

      doc.x = 30;
      doc.font(FONT_BOLD).fontSize(16);
      doc.text('- Boats');

      if (order.boats.length > 0) {
        this.displayBoats(doc, order);
      } else {
        doc.text('No boat reservations');
        doc.moveDown();
      }

      doc.x = 30;
      doc.font(FONT_BOLD).fontSize(18);
      doc.text(`Total Price: ${order.totalPrice} RON`);

      doc.end();
      return doc;
    } catch (error) {
      console.error(error);
    }
  }

  private async displayTickets(
    doc: typeof PDFDocument,
    order: Order,
  ): Promise<typeof PDFDocument> {
    doc.font(FONT).fontSize(14);
    doc.x = 45;
    for (const ticket of order.tickets) {
      doc.text(`Option Type: ${ticket.optionType}`);
      doc.text(
        `Arrive Date: ${moment(ticket.arriveDate).format('DD-MM-YYYY, dddd')}`,
      );
      doc.text(
        `Until Date: ${moment(ticket.untilDate).format('DD-MM-YYYY, dddd')}`,
      );
      doc.text(`Nr. Persons: ${ticket.nrPersons}`);
      doc.text(`Price: ${ticket.price} RON`);
      doc.moveDown();
    }
    doc.x = 30;
    doc.font(FONT_BOLD).fontSize(16);
    return doc;
  }

  private async displayBoats(
    doc: typeof PDFDocument,
    order: Order,
  ): Promise<typeof PDFDocument> {
    doc.font(FONT).fontSize(14);
    doc.x = 45;
    for (const boat of order.boats) {
      doc.text(`Option Type: ${boat.optionType}`);
      doc.text(`Date: ${moment(boat.date).format('DD-MM-YYYY, dddd')}`);
      doc.text(`From Time: ${boat.fromTime}`);
      doc.text(`Nr. Hours: ${boat.nrHours}`);
      doc.text(`Price: ${boat.price} RON`);
      doc.moveDown();
    }
    doc.x = 30;
    doc.font(FONT_BOLD).fontSize(16);
    return doc;
  }

  private async generateQRData(order: Order): Promise<string> {
    let qrData = `Order: \n${order.orderNumber}\n\n`;
    qrData += `Purchased on: \n${order.purchasedOn}\n\n`;
    qrData += `Buyer: \n${order.user.firstName} ${order.user.lastName}\n\n`;
    qrData += '- Tickets:\n\n';
    for (const ticket of order.tickets) {
      qrData += `Option Type: ${ticket.optionType}\n`;
      qrData += `Arrive Date: ${moment(ticket.arriveDate).format(
        'DD-MM-YYYY, dddd',
      )}\n`;
      qrData += `Until Date: ${moment(ticket.untilDate).format(
        'DD-MM-YYYY, dddd',
      )}\n`;
      qrData += `Nr. Persons: ${ticket.nrPersons}\n`;
      qrData += `Price: ${ticket.price} RON\n\n`;
    }

    qrData += '- Boats:\n\n';
    for (const boat of order.boats) {
      qrData += `Option Type: ${boat.optionType}\n`;
      qrData += `Date: ${moment(boat.date).format('DD-MM-YYYY, dddd')}\n`;
      qrData += `From Time: ${boat.fromTime}\n`;
      qrData += `Nr. Hours: ${boat.nrHours}\n`;
      qrData += `Price: ${boat.price} RON\n\n`;
    }

    qrData += `Total Price: ${order.totalPrice} RON\n`;

    return qrData;
  }

  private async generateQRCode(data: string): Promise<string> {
    try {
      const canvas = createCanvas(QR_CODE_SIZE, QR_CODE_SIZE);
      await qrCode.toCanvas(canvas, data);
      const qrCodeImageBuffer = canvas.toBuffer();
      const qrCodeImagePath = './qr_code.png';
      fs.writeFileSync(qrCodeImagePath, qrCodeImageBuffer);
      return qrCodeImagePath;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
  }
}
