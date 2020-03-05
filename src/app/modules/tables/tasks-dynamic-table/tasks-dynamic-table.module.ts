import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksDynamicTableComponent } from './tasks-dynamic-table.component';
import { TasksDynamicTableRoutingModule } from './tasks-dynamic-table-routing.module';
import { HeaderModule } from '@shared/components/header/header.module';
import { MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [TasksDynamicTableComponent],
  imports: [
    CommonModule,
    TasksDynamicTableRoutingModule,
    HeaderModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [TasksDynamicTableComponent]
})
export class TasksDynamicTableModule { }
