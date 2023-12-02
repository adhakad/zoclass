import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherAdmissionRoutingModule } from './teacher-admission-routing.module';
import { TeacherAdmissionComponent } from './teacher-admission.component';


@NgModule({
  declarations: [
    TeacherAdmissionComponent
  ],
  imports: [
    CommonModule,
    TeacherAdmissionRoutingModule
  ]
})
export class TeacherAdmissionModule { }
