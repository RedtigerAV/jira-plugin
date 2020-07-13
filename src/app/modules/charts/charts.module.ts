import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { LinearChartModule } from './linear-chart/linear-chart.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    LinearChartModule
  ]
})
export class ChartsModule { }
