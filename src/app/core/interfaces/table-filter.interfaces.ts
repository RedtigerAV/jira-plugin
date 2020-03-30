export enum TableFilterEnum {
  NUMBER = 'agNumberColumnFilter',
  TEXT = 'agTextColumnFilter',
  DATE = 'agDateColumnFilter'
}

export interface ITableFilter {
  filterType: 'number' | 'text' | 'date';
  type: TableFilterNumberTypeEnum | TableFilterTextTypeEnum;
  filter: any;
  filterTo: any;
  operator?: 'AND' | 'OR';
  condition1?: ITableFilter;
  condition2?: ITableFilter;
}

export interface ITableFilterState {
  [key: string]: ITableFilter;
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

export enum TableFilterTextTypeEnum {
  CONTAINS = 'contains',
  NOT_CONTAINS = 'notContains',
  EQUALS = 'equals',
  NOT_EQUAL = 'notEqual',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith'
}
