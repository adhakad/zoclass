import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherFeesCollectionRoutingModule } from './teacher-fees-collection-routing.module';
import { TeacherFeesCollectionComponent } from './teacher-fees-collection.component';


@NgModule({
  declarations: [
    TeacherFeesCollectionComponent
  ],
  imports: [
    CommonModule,
    TeacherFeesCollectionRoutingModule
  ]
})
export class TeacherFeesCollectionModule { }
