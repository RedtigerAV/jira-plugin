import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TasksLifecycleTableComponent } from './tasks-lifecycle-table.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TasksLifecycleTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksLifecycleTableRoutingModule {}
