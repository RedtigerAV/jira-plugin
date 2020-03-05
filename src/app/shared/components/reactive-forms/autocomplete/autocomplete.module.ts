import { NgModule } from '@angular/core';

import {
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteInputComponent } from './autocomplete-input.component';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  declarations: [AutocompleteComponent, AutocompleteInputComponent],
  exports: [AutocompleteComponent, AutocompleteInputComponent]
})
export class AutocomlpeteModule {}
