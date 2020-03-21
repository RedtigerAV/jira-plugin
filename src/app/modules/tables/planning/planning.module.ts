import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { HeaderModule } from '@shared/components/header/header.module';
import { MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [PlanningComponent],
  imports: [
    CommonModule,
    HeaderModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [PlanningComponent]
})
export class PlanningModule { }
