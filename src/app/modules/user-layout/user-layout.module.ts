import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout.component';
import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { MainPageModule } from '../main-page/main-page.module';
import { ReportModule } from '../tables/report/report.module';
import { PlanningModule } from '../tables/planning/planning.module';



@NgModule({
  declarations: [UserLayoutComponent],
  imports: [
    CommonModule,
    MainPageModule,
    UserLayoutRoutingModule,
    ReportModule,
    PlanningModule
  ],
  exports: [UserLayoutComponent]
})
export class UserLayoutModule { }
