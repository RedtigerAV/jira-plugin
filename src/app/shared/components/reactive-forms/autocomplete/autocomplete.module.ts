import { NgModule } from '@angular/core';

import { MatAutocompleteModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteInputComponent } from './autocomplete-input.component';
import { AutocompleteComponent } from './autocomplete.component';
import { CustomOptionDirectiveModule } from '@shared/components/reactive-forms/directives/custom-option/custom-option-directive.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    CustomOptionDirectiveModule
  ],
  declarations: [AutocompleteComponent, AutocompleteInputComponent],
  exports: [AutocompleteComponent, AutocompleteInputComponent, CustomOptionDirectiveModule]
})
export class AutocomlpeteModule {}
