import { ITableSort } from '../../interfaces/table-sort.interfaces';

export interface IReportSortsComponent {
  saveSort(sort: ITableSort): void;
  applySort(sort: ITableSort): void;
  resetSelectedSort(): void;
}
