import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksDynamicTableComponent } from './tasks-dynamic-table.component';
import { TasksDynamicTableRoutingModule } from './tasks-dynamic-table-routing.module';



@NgModule({
  declarations: [TasksDynamicTableComponent],
  imports: [
    CommonModule,
    TasksDynamicTableRoutingModule
  ],
  exports: [TasksDynamicTableComponent]
})
export class TasksDynamicTableModule { }
