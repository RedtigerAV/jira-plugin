import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningTableComponent } from './planning-table.component';
import { PlanningTableRoutingModule } from './planning-table-routing.module';



@NgModule({
  declarations: [PlanningTableComponent],
  imports: [
    CommonModule,
    PlanningTableRoutingModule
  ],
  exports: [PlanningTableComponent]
})
export class PlanningTableModule { }
