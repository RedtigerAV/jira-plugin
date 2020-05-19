import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPanelComponent } from './settings-panel.component';
import { NgStackFormsModule } from '@ng-stack/forms';
import { SelectModule } from '@shared/components/reactive-forms/select/select.module';
import { DatepickerModule } from '@shared/components/reactive-forms/datepicker/datepicker.module';



@NgModule({
  declarations: [SettingsPanelComponent],
  exports: [
    SettingsPanelComponent
  ],
  imports: [
    CommonModule,
    NgStackFormsModule,
    SelectModule,
    DatepickerModule
  ]
})
export class SettingsPanelModule { }
