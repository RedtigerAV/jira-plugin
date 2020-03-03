import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksTimeSpentTableComponent } from './tasks-time-spent-table.component';
import { TasksTimeSpentTableRoutingModule } from './tasks-time-spent-table-routing.module';



@NgModule({
  declarations: [TasksTimeSpentTableComponent],
  imports: [
    CommonModule,
    TasksTimeSpentTableRoutingModule
  ],
  exports: [TasksTimeSpentTableComponent]
})
export class TasksTimeSpentTableModule { }
