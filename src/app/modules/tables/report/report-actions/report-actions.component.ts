import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ReportMediator } from '../report.mediator';

@Component({
  selector: 'app-report-actions',
  templateUrl: './report-actions.component.html',
  styleUrls: ['./report-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportActionsComponent implements OnInit {
  @Output() generateTable = new EventEmitter();

  constructor(private readonly mediator: ReportMediator) {
    mediator.reportActionsComponent = this;
  }

  ngOnInit() {
  }

}
