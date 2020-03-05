import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TgCardComponent } from './tg-card.component';
import { TgCardActionsDirective, TgCardContentDirective, TgCardTitleDirective } from '@shared/components/tg-card/tg-card';

@NgModule({
  declarations: [TgCardComponent, TgCardTitleDirective, TgCardContentDirective, TgCardActionsDirective],
  imports: [CommonModule],
  exports: [TgCardComponent, TgCardTitleDirective, TgCardContentDirective, TgCardActionsDirective]
})
export class TgCardModule {}
