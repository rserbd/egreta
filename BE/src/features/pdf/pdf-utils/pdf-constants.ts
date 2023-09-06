import { PdfDocumentOptions } from './pdf-types';

export const PDF_DOCUMENT_OPTIONS: PdfDocumentOptions = {
  size: 'A4',
  bufferPages: true,
  layout: 'portrait',
  margins: {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
  },
};

export const FONT = 'Helvetica';
export const FONT_BOLD = 'Helvetica-Bold';
export const QR_CODE_SIZE = 130;
