import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { SelectComponent } from './select.component';
import { SelectTriggerDirective } from '@shared/components/reactive-forms/select/select-trigger.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatDialogModule],
  declarations: [SelectComponent, SelectTriggerDirective],
  exports: [SelectComponent, SelectTriggerDirective]
})
export class SelectModule {}
