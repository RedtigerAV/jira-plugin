import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IReportFiltersComponent } from '../interfaces/report-filters.interfaces';
import { ReportMediator } from '../report.mediator';

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFiltersComponent implements OnInit, IReportFiltersComponent {

  constructor(private readonly mediator: ReportMediator) {
    mediator.reportFiltersComponent = this;
  }

  ngOnInit() {
  }

  applyFilter(): void {
  }

  saveFilter(filterState: object): void {
  }

}
