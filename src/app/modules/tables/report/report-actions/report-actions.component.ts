import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReportMediator } from '../report.mediator';
import { ReportMediatorEventsEnum } from '../interfaces/report-mediator.interfaces';

@Component({
  selector: 'app-report-actions',
  templateUrl: './report-actions.component.html',
  styleUrls: ['./report-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportActionsComponent {
  public actionEventsEnum = ReportMediatorEventsEnum;

  constructor(private readonly mediator: ReportMediator) {
    mediator.reportActionsComponent = this;
  }

  public emit(event: ReportMediatorEventsEnum): void {
    this.mediator.notify(event);
  }
}
