import { NgModule } from '@angular/core';

import { ChipListComponent } from './chip-list.component';
import { NgStackFormsModule } from '@ng-stack/forms';
import { CommonModule } from '@angular/common';
import { InputModule } from '../input/input.module';
import { MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { TrackByPipeModule } from '@shared/pipes/trackBy/track-by-pipe.module';
import { ChipListInputComponent } from './chip-list-input.component';

@NgModule({
  imports: [
    CommonModule,
    NgStackFormsModule,
    InputModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    TrackByPipeModule,
    MatIconModule
  ],
  exports: [ChipListComponent, ChipListInputComponent],
  declarations: [ChipListComponent, ChipListInputComponent],
  providers: []
})
export class ChipListModule {}
