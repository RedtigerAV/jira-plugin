import { NgModule } from '@angular/core';

import { CheckboxComponent } from './checkbox.component';
import { MatCheckboxModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeAnyPipeModule } from '@shared/pipes/safe/safe-any-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    SafeAnyPipeModule,
  ],
  exports: [CheckboxComponent],
  declarations: [CheckboxComponent]
})
export class CheckboxModule {}
