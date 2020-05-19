import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page.component';
import { MatDividerModule, MatIconModule } from '@angular/material';
import { TgCardModule } from '@shared/components/tg-card/tg-card.module';
import { RouterModule } from '@angular/router';
import { CachePipeModule } from '@shared/pipes/cache/cache-pipe.module';
import { NgStackFormsModule } from '@ng-stack/forms';


@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    TgCardModule,
    MatIconModule,
    RouterModule,
    CachePipeModule,
    NgStackFormsModule
  ],
  exports: [MainPageComponent]
})
export class MainPageModule { }
