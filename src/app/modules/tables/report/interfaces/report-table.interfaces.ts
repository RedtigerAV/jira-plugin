import { IReportSettings } from './report-settings.interfaces';

export interface IReportTableComponent {
  generateTable(settings: IReportSettings): void;
  getFilterState(): object;
  getSortState(): object;
  applyFilter(filterState: object): void;
  applySort(sortState: object): void;
  exportAsCSV(): void;
  exportAsExcel(): void;
}
