import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningTableComponent } from './planning-table.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlanningTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningTableRoutingModule {}
