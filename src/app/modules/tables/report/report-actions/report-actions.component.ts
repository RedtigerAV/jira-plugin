import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReportMediator } from '../report.mediator';
import { ReportMediatorEventsEnum } from '../interfaces/report-mediator.interfaces';
import { IActionItem } from '../../../shared/actions-panel/actions-panel.component';

@Component({
  selector: 'app-report-actions',
  templateUrl: './report-actions.component.html',
  styleUrls: ['./report-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportActionsComponent {
  public actions: IActionItem[] = [
    {
      title: 'Сгенерировать таблицу',
      action: (() => {this.emit(ReportMediatorEventsEnum.GENERATE_TABLE)}).bind(this)
    },
    {
      title: 'Сохранить фильтр',
      action: (() => {this.emit(ReportMediatorEventsEnum.SAVE_FILTER)}).bind(this)
    },
    {
      title: 'Сохранить сортировку',
      action: (() => {this.emit(ReportMediatorEventsEnum.SAVE_SORT)}).bind(this)
    },
    {
      title: 'Применить настройки по умолчанию',
      action: (() => {this.emit(ReportMediatorEventsEnum.APPLY_DEFAULT_SETTINGS)}).bind(this)
    },
    {
      title: 'Обновить настройки по умолчанию',
      action: (() => {this.emit(ReportMediatorEventsEnum.SAVE_SETTINGS_AS_DEFAULT)}).bind(this)
    },
    {
      title: 'Сбросить фильтрацию таблицы',
      action: (() => {this.emit(ReportMediatorEventsEnum.RESET_ALL_FILTERS)}).bind(this)
    },
    {
      title: 'Сбросить сортировку таблицы',
      action: (() => {this.emit(ReportMediatorEventsEnum.RESET_ALL_SORTS)}).bind(this)
    },
    {
      title: 'Экспортировать в CSV',
      action: (() => {this.emit(ReportMediatorEventsEnum.EXPORT_AS_CSV)}).bind(this)
    }
  ];

  constructor(private readonly mediator: ReportMediator) {
    mediator.reportActionsComponent = this;
  }

  public emit(event: ReportMediatorEventsEnum): void {
    this.mediator.notify(event);
  }
}
