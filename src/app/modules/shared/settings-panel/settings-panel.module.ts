import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPanelComponent } from './settings-panel.component';
import { NgStackFormsModule } from '@ng-stack/forms';
import { SelectModule } from '@shared/components/reactive-forms/select/select.module';
import { DatepickerModule } from '@shared/components/reactive-forms/datepicker/datepicker.module';
import { ChipListModule } from '@shared/components/reactive-forms/chip-list/chip-list.module';
import { CustomOptionDirectiveModule } from '@shared/components/reactive-forms/directives/custom-option/custom-option-directive.module';
import { FormsModule } from '@angular/forms';
import { EmptyOptionDirectiveModule } from '@shared/components/reactive-forms/directives/empty-option/empty-option-directive.module';



@NgModule({
  declarations: [SettingsPanelComponent],
  exports: [
    SettingsPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgStackFormsModule,
    SelectModule,
    ChipListModule,
    DatepickerModule,
    CustomOptionDirectiveModule,
    EmptyOptionDirectiveModule
  ]
})
export class SettingsPanelModule { }
