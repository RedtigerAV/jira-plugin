import { NgModule } from '@angular/core';

import { MaskInputComponent } from './mask-input.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgxMaskModule.forRoot()],
  exports: [MaskInputComponent],
  declarations: [MaskInputComponent]
})
export class MaskInputModule {}
