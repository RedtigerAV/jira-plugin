import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export interface IActionItem {
  title: string;
  action: Function;
}

// ToDo: сделать на ng-template'ах
@Component({
  selector: 'app-actions-panel',
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsPanelComponent {
  @Input() actions: IActionItem[];
}
