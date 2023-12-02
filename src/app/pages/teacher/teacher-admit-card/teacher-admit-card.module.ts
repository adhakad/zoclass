import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherAdmitCardRoutingModule } from './teacher-admit-card-routing.module';
import { TeacherAdmitCardComponent } from './teacher-admit-card.component';


@NgModule({
  declarations: [
    TeacherAdmitCardComponent
  ],
  imports: [
    CommonModule,
    TeacherAdmitCardRoutingModule
  ]
})
export class TeacherAdmitCardModule { }
