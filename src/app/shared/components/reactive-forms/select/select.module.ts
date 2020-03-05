import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
  declarations: [SelectComponent],
  exports: [SelectComponent]
})
export class SelectModule {}
