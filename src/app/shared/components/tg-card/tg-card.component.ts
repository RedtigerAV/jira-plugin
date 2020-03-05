import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-tg-card',
  templateUrl: './tg-card.component.html',
  styleUrls: ['./tg-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TgCardComponent {
  @Input() clickable = false;
}
