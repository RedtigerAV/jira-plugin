import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel.component';
import { SettingsPanelModule } from '../settings-panel/settings-panel.module';
import { TgCardModule } from '@shared/components/tg-card/tg-card.module';
import { ActionsPanelModule } from '../actions-panel/actions-panel.module';



@NgModule({
  declarations: [ControlPanelComponent],
  exports: [
    ControlPanelComponent
  ],
  imports: [
    CommonModule,
    SettingsPanelModule,
    TgCardModule,
    ActionsPanelModule
  ]
})
export class ControlPanelModule {}
