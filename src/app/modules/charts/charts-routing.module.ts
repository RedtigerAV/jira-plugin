import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinearChartComponent } from './linear-chart/linear-chart.component';
import { LinearChartContextResolver } from './linear-chart/linear-chart-context.resolver';


const routes: Routes = [
  {
    path: 'linear',
    children: [
      {
        path: ':chartID',
        pathMatch: 'full',
        component: LinearChartComponent,
        resolve: {
          context: LinearChartContextResolver
        }
      }
    ]
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
