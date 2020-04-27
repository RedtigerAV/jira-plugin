import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { HeaderModule } from '@shared/components/header/header.module';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { NgStackFormsModule } from '@ng-stack/forms';
import { TgCardModule } from '@shared/components/tg-card/tg-card.module';
import { SelectModule } from '@shared/components/reactive-forms/select/select.module';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [PlanningComponent],
  imports: [
    CommonModule,
    HeaderModule,
    MatButtonModule,
    MatIconModule,
    NgStackFormsModule,
    TgCardModule,
    SelectModule,
    AgGridModule,
    MatProgressSpinnerModule
  ],
  exports: [PlanningComponent]
})
export class PlanningModule { }
