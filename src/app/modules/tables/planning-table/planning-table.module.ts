import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningTableComponent } from './planning-table.component';
import { PlanningTableRoutingModule } from './planning-table-routing.module';
import { HeaderModule } from '@shared/components/header/header.module';
import { MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [PlanningTableComponent],
  imports: [
    CommonModule,
    PlanningTableRoutingModule,
    HeaderModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [PlanningTableComponent]
})
export class PlanningTableModule { }
