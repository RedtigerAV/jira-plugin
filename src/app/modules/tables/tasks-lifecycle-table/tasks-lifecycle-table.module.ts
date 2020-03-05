import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksLifecycleTableComponent } from './tasks-lifecycle-table.component';
import { TasksLifecycleTableRoutingModule } from './tasks-lifecycle-table-routing.module';
import { HeaderModule } from '@shared/components/header/header.module';
import { MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [TasksLifecycleTableComponent],
  imports: [
    CommonModule,
    TasksLifecycleTableRoutingModule,
    HeaderModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [TasksLifecycleTableComponent]
})
export class TasksLifecycleTableModule { }
