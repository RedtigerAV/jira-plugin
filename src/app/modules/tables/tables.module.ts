import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { ReportModule } from './report/report.module';
import { PlanningModule } from './planning/planning.module';


@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    ReportModule,
    PlanningModule
  ]
})
export class TablesModule {}
