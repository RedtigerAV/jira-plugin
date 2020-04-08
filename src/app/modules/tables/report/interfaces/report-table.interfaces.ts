import { ITableFilterState } from '@core/interfaces/table-filter.interfaces';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { TableStateEnum } from '@core/interfaces/table-state.interface';

export interface IReportTableComponent {
  tableState$: BehaviorSubject<TableStateEnum>
  generateTable(settings: IReportSettings): void;
  getFilterState(): ITableFilterState;
  getSortState(): object;
  applyFilter(filterState: ITableFilterState): void;
  applySort(sortState: object): void;
  exportAsCSV(): void;
}
