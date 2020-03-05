import { NgModule } from '@angular/core';

import { TextAreaComponent } from './text-area.component';
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
  exports: [TextAreaComponent],
  declarations: [TextAreaComponent]
})
export class TextAreaModule {}
