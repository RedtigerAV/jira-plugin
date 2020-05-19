import { ITableFilterState } from '../../interfaces/table-filter.interfaces';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { TableStateEnum } from '../../interfaces/table-state.interface';
import { ITableSortState } from '../../interfaces/table-sort.interfaces';

export interface IReportTableComponent {
  tableState$: BehaviorSubject<TableStateEnum>
  generateTable(settings: IReportSettings): void;
  getFilterState(): ITableFilterState;
  getSortState(): ITableSortState[];
  applyFilter(filterState: ITableFilterState): void;
  applySort(sortState: ITableSortState[]): void;
  exportAsCSV(): void;
}
