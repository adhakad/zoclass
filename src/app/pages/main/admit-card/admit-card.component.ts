import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdmitCardService } from 'src/app/services/admit-card.service';
import { ClassService } from 'src/app/services/class.service';
import { PrintPdfService } from 'src/app/services/print-pdf/print-pdf.service';
import { SchoolService } from 'src/app/services/school.service';


@Component({
  selector: 'app-admit-card',
  templateUrl: './admit-card.component.html',
  styleUrls: ['./admit-card.component.css']
})
export class AdmitCardComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  errorMsg: string = '';
  admitCardForm: FormGroup;
  schoolInfo: any;
  classInfo: any;
  studentAdmitCardInfo: any;
  admitCardInfo: any;
  processedData: any[] = [];
  loader: Boolean = false;
  students = [
    { id: 1, name: 'Student 1' },
    { id: 2, name: 'Student 2' },
    { id: 3, name: 'Student 3' },
    { id: 4, name: 'Student 4' },
    { id: 5, name: 'Student 5' },
    { id: 6, name: 'Student 6' },
    // Add more students as needed
  ];
  constructor(private fb: FormBuilder, private schoolService: SchoolService, private printPdfService: PrintPdfService, private admitCardService: AdmitCardService, private classService: ClassService) {
    this.admitCardForm = this.fb.group({
      admissionNo: ['', Validators.required],
      class: ['', Validators.required],
      rollNumber: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.getClass();
    this.getSchool();
  }
  printStudentData() {
    const printContent = this.getPrintContent();
    this.printPdfService.printContent(printContent);
  }

  private getPrintContent(): string {
    let printHtml = '<html>';
    printHtml += '<head>';
    printHtml += '<style>';
    printHtml += 'body { margin: 0; padding: 0; }'; // Set body styles
    printHtml += 'div { margin: 0; padding: 0;background-color:aqua; }';
    // Add your additional styles here
    printHtml += '</style>';
    printHtml += '</head>';
    printHtml += '<body>';

    // this.students.forEach((student, index) => {
      const studentElement = document.getElementById(`student`);
      if (studentElement) {
        printHtml += studentElement.outerHTML;

        // Add a page break after each student except the last one
        // if (index < this.students.length - 1) {
          printHtml += '<div style="page-break-after: always;"></div>';
        // }
      }
    // });

    printHtml += '</body></html>';

    return printHtml;
  }




  // private getPrintContent(): string {
  //   let printHtml = '<html>';
  //   printHtml += '<head>';
  //   printHtml += '<style>';
  //   printHtml += 'body { margin: 0; padding: 0; }'; // Set body styles
  //   printHtml += 'div { margin: 0; padding: 0;background-color:aqua; }';
  //   // Add your additional styles here
  //   printHtml += '</style>';
  //   printHtml += '</head>';
  //   printHtml += '<body>';

  //   this.students.forEach((student, index) => {
  //     const studentElement = document.getElementById(`student-${student.id}`);
  //     if (studentElement) {
  //       printHtml += studentElement.outerHTML;

  //       // Add a page break after each student except the last one
  //       if (index < this.students.length - 1) {
  //         printHtml += '<div style="page-break-after: always;"></div>';
  //       }
  //     }
  //   });

  //   printHtml += '</body></html>';

  //   return printHtml;
  // }

  // printStudentData() {
  //   const studentElements: HTMLElement[] = this.students.map(student => {
  //     const element = document.getElementById(`student-${student.id}`);
  //     return element!;
  //   });

  //   if (studentElements.length > 0) {
  //     this.printPdfService.printStudents(studentElements);
  //   } else {
  //     console.error('No matching elements found for printing.');
  //   }
  // }
  printContent() {
    this.printPdfService.printElement(this.content.nativeElement);
  }

  downloadPDF() {
    this.printPdfService.generatePDF(this.content.nativeElement, "Admitcard.pdf");
  }
  getSchool() {
    this.schoolService.getSchool().subscribe((res: any) => {
      if (res) {
        this.schoolInfo = res;
      }
    })
  }
  getClass() {
    this.classService.getClassList().subscribe((res: any) => {
      if (res) {
        this.classInfo = res;
      }
    })
  }
  admitCard() {
    this.admitCardService.singleStudentAdmitCard(this.admitCardForm.value).subscribe((res: any) => {
      if (res) {
        this.loader=true;
        if (!this.processedData || !this.studentAdmitCardInfo || !this.admitCardInfo) {
          this.studentAdmitCardInfo = { ...res.studentInfo, ...res.admitCard };
          this.admitCardInfo = res.admitCardStructure;
          this.processData();
        }

      }
    }, err => {
      this.errorMsg = err.error.errorMsg;
    })
  }
  processData() {
    for (let i = 0; i < this.admitCardInfo.examDate.length; i++) {
      const subject = Object.keys(this.admitCardInfo.examDate[i])[0];
      const date = Object.values(this.admitCardInfo.examDate[i])[0];
      const startTime = Object.values(this.admitCardInfo.examStartTime[i])[0];
      const endTime = Object.values(this.admitCardInfo.examEndTime[i])[0];

      this.processedData.push({
        subject,
        date,
        timing: `${startTime} to ${endTime}`
      });
    }
    setTimeout(() => {
      this.loader = false;
    }, 1500)

  }

}
