import { ITableFilterState } from '../../interfaces/table-filter.interfaces';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoadingStateEnum } from '@core/interfaces/loading-state.interface';
import { ITableSortState } from '../../interfaces/table-sort.interfaces';

export interface IReportTableComponent {
  tableState$: BehaviorSubject<LoadingStateEnum>
  generateTable(settings: ISettingsPanelForm): void;
  getFilterState(): ITableFilterState;
  getSortState(): ITableSortState[];
  applyFilter(filterState: ITableFilterState): void;
  applySort(sortState: ITableSortState[]): void;
  exportAsCSV(): void;
}
