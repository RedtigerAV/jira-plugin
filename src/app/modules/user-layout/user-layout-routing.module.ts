import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { MainPageComponent } from '../main-page/main-page.component';

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
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'lifecycle-table',
        pathMatch: 'full',
        loadChildren: () => import('../tables/tasks-lifecycle-table/tasks-lifecycle-table.module').then(m => m.TasksLifecycleTableModule)
      },
      {
        path: 'dynamic-table',
        pathMatch: 'full',
        loadChildren: () => import('../tables/tasks-dynamic-table/tasks-dynamic-table.module').then(m => m.TasksDynamicTableModule)
      },
      {
        path: 'time-spent-table',
        pathMatch: 'full',
        loadChildren: () => import('../tables/tasks-time-spent-table/tasks-time-spent-table.module').then(m => m.TasksTimeSpentTableModule)
      },
      {
        path: 'planning-table',
        pathMatch: 'full',
        loadChildren: () => import('../tables/planning-table/planning-table.module').then(m => m.PlanningTableModule)
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
