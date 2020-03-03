import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TasksTimeSpentTableComponent } from './tasks-time-spent-table.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TasksTimeSpentTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksTimeSpentTableRoutingModule {}
