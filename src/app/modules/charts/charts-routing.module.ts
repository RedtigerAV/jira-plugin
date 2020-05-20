import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AverageProductivityComponent } from './average-productivity/average-productivity.component';


const routes: Routes = [
  {
    path: 'average-productivity',
    pathMatch: 'full',
    component: AverageProductivityComponent
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
