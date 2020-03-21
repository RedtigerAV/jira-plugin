import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { ReportComponent } from '../tables/report/report.component';
import { PlanningComponent } from '../tables/planning/planning.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MainPageComponent
      },
      {
        path: 'settings',
        pathMatch: 'full',
        component: ReportComponent
      },
      {
        path: 'lifecycle-table',
        pathMatch: 'full',
        component: ReportComponent
      },
      {
        path: 'dynamic-table',
        pathMatch: 'full',
        component: ReportComponent
      },
      {
        path: 'time-spent-table',
        pathMatch: 'full',
        component: ReportComponent
      },
      {
        path: 'planning-table',
        pathMatch: 'full',
        component: PlanningComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule {}
