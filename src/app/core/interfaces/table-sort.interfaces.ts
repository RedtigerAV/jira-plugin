import { ITableColumnPreview } from '@core/interfaces/table-column-preview.interface';

export interface ITableSortState {
  colId: string;
  columnPreview?: ITableColumnPreview;
  sort: 'asc' | 'desc';
}

export interface ITableSort {
  id?: string;
  name: string;
  state: ITableSortState[];
}
