import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page.component';
import { MatDividerModule, MatIconModule } from '@angular/material';
import { TgCardModule } from '@shared/components/tg-card/tg-card.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    TgCardModule,
    MatIconModule,
    RouterModule
  ],
  exports: [MainPageComponent]
})
export class MainPageModule { }
