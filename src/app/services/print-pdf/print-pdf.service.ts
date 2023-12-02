import { Injectable } from '@angular/core';
import  jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Injectable({
  providedIn: 'root'
})
export class PrintPdfService {
  constructor() {}
  printElement(element: HTMLElement): void {
    html2canvas(element).then(canvas => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF("p", "mm", "a4");
      var position = 0;
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      doc.autoPrint();
      window.open(doc.output('bloburl'), '_blank');
    });
  }

  generatePDF(element: HTMLElement,params:string): void {
    html2canvas(element).then(canvas => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF("p", "mm", "a4");
      var position = 0;
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      doc.save(params);
    });
  }
}
