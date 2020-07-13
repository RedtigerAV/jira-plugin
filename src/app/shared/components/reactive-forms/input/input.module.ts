import { NgModule } from '@angular/core';

import { InputComponent } from './input.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputAddonsModule } from '../input-addons/input-addons.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, InputAddonsModule],
  exports: [InputComponent, InputAddonsModule],
  declarations: [InputComponent]
})
export class InputModule {}
