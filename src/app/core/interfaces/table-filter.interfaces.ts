export enum TableFilterEnum {
  NUMBER = 'agNumberColumnFilter',
  TEXT = 'agTextColumnFilter',
  DATE = 'agDateColumnFilter'
}

export interface ITableColumnFilter {
  filterType: 'number' | 'text' | 'date';
  type?: TableFilterNumberTypeEnum | TableFilterDateTypeEnum | TableFilterTextTypeEnum;
  filter?: any;
  columnShortDef?: ITableFilterColumnShortDef;
  filterTo?: any;
  operator?: 'AND' | 'OR';
  condition1?: ITableColumnFilter;
  condition2?: ITableColumnFilter;
}

export interface ITableFilterColumnShortDef {
  field: string;
  headerName?: string;
}

export interface ITableFilterState {
  [key: string]: ITableColumnFilter;
}

export interface ITableFilter {
  id?: string;
  name: string;
  state: ITableFilterState;
}

export enum TableFilterNumberTypeEnum {
  EQUALS = 'equals',
  NOT_EQUAL = 'notEqual',
  LESS_THAN = 'lessThan',
  LESS_THAN_OR_EQUALS = 'lessThanOrEqual',
  GREATER_THAN = 'greaterThan',
  GREATER_THAN_OR_EQUALS = 'greaterThanOrEqual',
  IN_RANGE = 'inRange'
}

export enum TableFilterDateTypeEnum {
  EQUALS = 'equals',
  NOT_EQUAL = 'notEqual',
  LESS_THAN = 'lessThan',
  GREATER_THAN = 'greaterThan',
  IN_RANGE = 'inRange'
}

export enum TableFilterTextTypeEnum {
  CONTAINS = 'contains',
  NOT_CONTAINS = 'notContains',
  EQUALS = 'equals',
  NOT_EQUAL = 'notEqual',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith'
}
