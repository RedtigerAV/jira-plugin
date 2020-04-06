import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { SelectComponent } from './select.component';
import { CustomOptionDirective } from '@shared/directives/custom-option.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
  declarations: [SelectComponent, CustomOptionDirective],
  exports: [SelectComponent, CustomOptionDirective]
})
export class SelectModule {}
