import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IReportTableComponent } from '../interfaces/report-table.interfaces';
import { IReportSettings } from '../interfaces/report-settings.interfaces';
import { ReportMediator } from '../report.mediator';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportTableComponent implements OnInit, IReportTableComponent {

  constructor(private readonly mediator: ReportMediator) {
    mediator.reportTableComponent = this;
  }

  ngOnInit() {
  }

  applyFilter(filterState: object): void {
  }

  applySort(sortState: object): void {
  }

  exportAsCSV(): void {
  }

  exportAsExcel(): void {
  }

  generateTable(settings: IReportSettings): void {
  }

  getFilterState(): object {
    return undefined;
  }

  getSortState(): object {
    return undefined;
  }
}
