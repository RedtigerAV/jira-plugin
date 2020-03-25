import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSettingsComponent } from './table-settings.component';
import { NgStackFormsModule } from '@ng-stack/forms';
import { SelectModule } from '@shared/components/reactive-forms/select/select.module';
import { DatepickerModule } from '@shared/components/reactive-forms/datepicker/datepicker.module';



@NgModule({
  declarations: [TableSettingsComponent],
  exports: [
    TableSettingsComponent
  ],
  imports: [
    CommonModule,
    NgStackFormsModule,
    SelectModule,
    DatepickerModule
  ]
})
export class TableSettingsModule { }