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
        path: 'tables',
        loadChildren: () => import('../tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('../charts/charts.module').then(m => m.ChartsModule)
      },
      {
        path: '**',
        redirectTo: '/'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule {}
