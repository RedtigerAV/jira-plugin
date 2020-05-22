import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinearChartComponent } from './linear-chart.component';
import { HeaderModule } from '@shared/components/header/header.module';
import { TgCardModule } from '@shared/components/tg-card/tg-card.module';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ControlPanelModule } from '../../shared/control-panel/control-panel.module';
import { SettingsPanelModalModule } from '../../shared/settings-panel/settings-panel-modal/settings-panel-modal.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [LinearChartComponent],
  imports: [
    CommonModule,
    HeaderModule,
    TgCardModule,
    MatProgressSpinnerModule,
    ControlPanelModule,
    SettingsPanelModalModule,
    NgxChartsModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [LinearChartComponent]
})
export class LinearChartModule { }
