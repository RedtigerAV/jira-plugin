import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AverageProductivityComponent } from './average-productivity/average-productivity.component';
import { UnfinishedWorkComponent } from './unfinished-work/unfinished-work.component';
import { PlanFactComponent } from './plan-fact/plan-fact.component';


const routes: Routes = [
  {
    path: 'average-productivity',
    pathMatch: 'full',
    component: AverageProductivityComponent
  },
  {
    path: 'unfinished-work',
    pathMatch: 'full',
    component: UnfinishedWorkComponent
  },
  {
    path: 'plan-fact',
    pathMatch: 'full',
    component: PlanFactComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
