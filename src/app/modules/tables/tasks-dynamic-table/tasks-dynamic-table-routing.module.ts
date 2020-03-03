import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TasksDynamicTableComponent } from './tasks-dynamic-table.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TasksDynamicTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksDynamicTableRoutingModule {}
