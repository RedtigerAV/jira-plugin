import { TableFilterEnum } from './table-filter.interfaces';
import { ITableColumnPreview } from './table-column-preview.interface';
import { IFilterOptionDef } from 'ag-grid-community';
import { Comparator } from 'ag-grid-community/dist/lib/filter/provided/scalerFilter';

export enum ITableColumnPinEnum {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface ITableColumn extends ITableDefaultColumn, ITableColumnPreview {
  cellRenderer?: (params: any) => string;
  editable?: boolean;
  children?: ITableColumn[];
  pinned?: ITableColumnPinEnum;
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
    filterOptions?: IFilterOptionDef
  };
  comparator?: (value1, value2) => number;
  sortable?: boolean;
  resizable?: boolean;
}
