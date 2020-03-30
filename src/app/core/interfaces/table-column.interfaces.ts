import { TableFilterEnum } from '@core/interfaces/table-filter.interfaces';

export interface ITableColumn extends ITableDefaultColumn {
  field: string;
  headerName?: string;
  children?: ITableColumn[];
}

export interface ITableDefaultColumn {
  flex?: number;
  headerClass?: string | string[];
  toolPanelClass?: string | string[];
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
  filter?: TableFilterEnum;
  filterParams?: {
    applyButton?: boolean,
    resetButton?: boolean,
  };
  sortable?: boolean;
  resizable?: boolean;
}
