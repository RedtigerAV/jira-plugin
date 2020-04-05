import { ITableFilterState } from '@core/interfaces/table-filter.interfaces';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';

export interface IReportTableComponent {
  generateTable(settings: IReportSettings): void;
  getFilterState(): ITableFilterState;
  getSortState(): object;
  applyFilter(filterState: ITableFilterState): void;
  applySort(sortState: object): void;
  exportAsCSV(): void;
  exportAsExcel(): void;
}
