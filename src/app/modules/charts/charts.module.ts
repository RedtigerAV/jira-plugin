import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { AverageProductivityModule } from './average-productivity/average-productivity.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    AverageProductivityModule
  ]
})
export class ChartsModule { }
