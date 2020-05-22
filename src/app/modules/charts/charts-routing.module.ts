import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinearChartComponent } from './linear-chart/linear-chart.component';
import { LinearChartContextResolver } from './linear-chart/linear-chart-context.resolver';
import { UnfinishedWorkComponent } from './unfinished-work/unfinished-work.component';


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
    path: 'bar',
    children: [
      {
        path: 'unfinished-work',
        pathMatch: 'full',
        component: UnfinishedWorkComponent
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
