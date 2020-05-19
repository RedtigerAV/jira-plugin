import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportActionsComponent } from './report-actions.component';
import { ActionsPanelModule } from '../../../shared/actions-panel/actions-panel.module';



@NgModule({
  declarations: [ReportActionsComponent],
  imports: [
    CommonModule,
    ActionsPanelModule
  ],
  exports: [ReportActionsComponent]
})
export class ReportActionsModule { }
