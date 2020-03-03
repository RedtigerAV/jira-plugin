import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksLifecycleTableComponent } from './tasks-lifecycle-table.component';
import { TasksLifecycleTableRoutingModule } from './tasks-lifecycle-table-routing.module';



@NgModule({
  declarations: [TasksLifecycleTableComponent],
  imports: [
    CommonModule,
    TasksLifecycleTableRoutingModule
  ],
  exports: [TasksLifecycleTableComponent]
})
export class TasksLifecycleTableModule { }
