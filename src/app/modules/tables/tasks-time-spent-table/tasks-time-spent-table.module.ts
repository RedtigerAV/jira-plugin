import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksTimeSpentTableComponent } from './tasks-time-spent-table.component';
import { TasksTimeSpentTableRoutingModule } from './tasks-time-spent-table-routing.module';
import { HeaderModule } from '@shared/components/header/header.module';
import { MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [TasksTimeSpentTableComponent],
  imports: [
    CommonModule,
    TasksTimeSpentTableRoutingModule,
    HeaderModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [TasksTimeSpentTableComponent]
})
export class TasksTimeSpentTableModule { }
