import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { AverageProductivityModule } from './average-productivity/average-productivity.module';
import { UnfinishedWorkModule } from './unfinished-work/unfinished-work.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    AverageProductivityModule,
    UnfinishedWorkModule
  ]
})
export class ChartsModule { }
