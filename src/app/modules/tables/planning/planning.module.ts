import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { HeaderModule } from '@shared/components/header/header.module';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { NgStackFormsModule } from '@ng-stack/forms';
import { TgCardModule } from '@shared/components/tg-card/tg-card.module';
import { AgGridModule } from 'ag-grid-angular';
import { ControlPanelModule } from '../../shared/control-panel/control-panel.module';
import { SettingsPanelModalModule } from '../../shared/settings-panel/settings-panel-modal/settings-panel-modal.module';



@NgModule({
  declarations: [PlanningComponent],
  imports: [
    CommonModule,
    HeaderModule,
    MatIconModule,
    NgStackFormsModule,
    SettingsPanelModalModule,
    TgCardModule,
    AgGridModule,
    MatProgressSpinnerModule,
    ControlPanelModule
  ],
  exports: [PlanningComponent]
})
export class PlanningModule { }
