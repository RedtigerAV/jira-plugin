import { Directive } from '@angular/core';

@Directive({
  selector: 'app-tg-card-title, [app-tg-card-title], [appTgCardTitle]',
  exportAs: 'app-tg-card-title'
})
export class TgCardTitleDirective {}

@Directive({
  selector: 'app-tg-card-content, [app-tg-card-content], [appTgCardContent]',
  exportAs: 'app-tg-card-content'
})
export class TgCardContentDirective {}

@Directive({
  selector: 'app-tg-card-actions, [app-tg-card-actions], [appTgCardActions]',
  exportAs: 'app-tg-card-actions'
})
export class TgCardActionsDirective {}
