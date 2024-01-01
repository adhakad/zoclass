import { Injectable } from '@angular/core';
import  jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable, from } from 'rxjs';


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

  // printElement(element: HTMLElement): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     html2canvas(element).then((canvas) => {
  //       var imgWidth = 208;
  //       var imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       const imgData = canvas.toDataURL('image/png');
  //       const doc = new jsPDF('p', 'mm', 'a4');
  //       var position = 0;
  //       doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       doc.autoPrint();
  //       // Create a Blob from the PDF data
  //       const blob = doc.output('blob');
  //       // Create a Blob URL
  //       const blobUrl = URL.createObjectURL(blob);
  //       // Open a new window with the Blob URL
  //       const newWindow = window.open(blobUrl, '_blank');
  //       // Resolve the Promise with the Blob URL
  //       resolve(blobUrl);
  //       // Cleanup
  //       if (newWindow) {
  //         newWindow.onload = () => {
  //           window.URL.revokeObjectURL(blobUrl);
  //         };
  //       } else {
  //         window.URL.revokeObjectURL(blobUrl);
  //       }
  //     }).catch((error) => {
  //       reject(error);
  //     });
  //   });
  // }
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
