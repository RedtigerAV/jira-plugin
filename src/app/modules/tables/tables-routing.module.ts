import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanningComponent } from './planning/planning.component';
import { ReportComponent } from './report/report.component';
import { ReportContextResolver } from './report/report-context.resolver';


const routes: Routes = [
  {
    path: 'record/planning',
    pathMatch: 'full',
    component: PlanningComponent
  },
  {
    path: 'report/:reportID',
    component: ReportComponent,
    resolve: {
      context: ReportContextResolver
    }
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
export class TablesRoutingModule { }
