export interface PdfDocumentOptions {
  size: string;
  bufferPages: boolean;
  layout: 'portrait';
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}
