import { NgModule } from '@angular/core';

import { InputComponent } from './input.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [InputComponent],
  declarations: [InputComponent]
})
export class InputModule {}
