import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { UnfinishedWorkModule } from './unfinished-work/unfinished-work.module';
import { LinearChartModule } from './linear-chart/linear-chart.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    LinearChartModule,
    UnfinishedWorkModule
  ]
})
export class ChartsModule { }
