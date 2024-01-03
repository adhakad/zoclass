import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../modal/student.modal';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IssuedTransferCertificateService {
  url = `${environment.API_URL}/v1/issued-transfer-certificate`;
  constructor(private http:HttpClient) { }

  createTransferCertificate(studentData:any){
    return this.http.post(this.url,studentData);
  }
  // addOnlineAdmission(studentData:any){
  //   return this.http.post(`${this.url}/online-admission`,studentData);
  // }
  // addBulkStudentRecord(bulkStudentRecord:any) {
  //   return this.http.post(`${this.url}/bulk-student-record`,bulkStudentRecord);
  // }
  // getStudentList() {
  //   return this.http.get<Student[]>(this.url);
  // }
  // getStudentByClass(cls:any){
  //   return this.http.get(`${this.url}/student/${cls}`);
  // }
  // getStudentCount() {
  //   return this.http.get(`${this.url}/student-count`);
  // }
  // studentPaginationList(studentData:any){
  //   return this.http.post(`${this.url}/student-pagination`,studentData);
  // }
  issuedTransferCertificatePagination(studentData:any){
    return this.http.post(`${this.url}/issued-transfer-certificate-pagination`,studentData);
  }
  // studentPaginationByAdmissionAndClass(studentData:any){
  //   return this.http.post(`${this.url}/student-admission-pagination/class`,studentData);
  // }
  // studentAdmissionEnquiryPagination(studentData:any){
  //   return this.http.post(`${this.url}/student-admission-enquiry-pagination`,studentData);
  // }
  // updateStudent(studentData:any){
  //   return this.http.put(`${this.url}/${studentData._id}`, studentData);
  // }
  // changeStatus(params:any){
  //   return this.http.put(`${this.url}/status/${params.id}`,params);
  // }
  // deleteStudent(id:String){
  //   return this.http.delete(`${this.url}/${id}`);
  // }
  // deletedeleteAdmissionEnquiry(id:String){
  //   return this.http.delete(`${this.url}/admission-enquiry/${id}`);
  // }
  // studentClassPromote(studentData:any){
  //   return this.http.put(`${this.url}/class-promote/${studentData._id}`, studentData);
  // }
}
