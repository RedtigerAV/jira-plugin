import { ITableFilter } from '../../interfaces/table-filter.interfaces';


export interface IReportFiltersComponent {
  saveFilter(filter: ITableFilter): void;
  applyFilter(filter: ITableFilter): void;
  resetSelectedFilter(): void;
}
