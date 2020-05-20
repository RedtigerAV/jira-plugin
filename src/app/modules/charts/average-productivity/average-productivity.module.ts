import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AverageProductivityComponent } from './average-productivity.component';
import { HeaderModule } from '@shared/components/header/header.module';
import { TgCardModule } from '@shared/components/tg-card/tg-card.module';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ControlPanelModule } from '../../shared/control-panel/control-panel.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SettingsPanelModalModule } from '../../shared/settings-panel/settings-panel-modal/settings-panel-modal.module';
import { AverageProductivityService } from './average-productivity.service';



@NgModule({
  declarations: [AverageProductivityComponent],
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
  exports: [AverageProductivityComponent],
  providers: [AverageProductivityService]
})
export class AverageProductivityModule { }
