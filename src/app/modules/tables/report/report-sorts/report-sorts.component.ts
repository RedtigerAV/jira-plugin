import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IReportSortsComponent } from '../interfaces/report-sorts.interfaces';
import { ReportMediator } from '../report.mediator';

@Component({
  selector: 'app-report-sorts',
  templateUrl: './report-sorts.component.html',
  styleUrls: ['./report-sorts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportSortsComponent implements OnInit, IReportSortsComponent {

  constructor(private readonly mediator: ReportMediator) {
    mediator.reportSortsComponent = this;
  }

  ngOnInit() {
  }

  applySort(): void {
  }

  saveSort(sortState: object): void {
  }

}
