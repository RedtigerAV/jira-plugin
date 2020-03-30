import { ITableFilterState } from '@core/interfaces/table-filter.interfaces';

export interface IReportFiltersComponent {
  saveFilter(filterState: ITableFilterState): void;
  applyFilter(): void;
}
