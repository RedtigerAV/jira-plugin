export enum TableTypeEnum {
  REPORT = 'report',
  RECORD = 'record'
}

export enum TableID {
  LIFECYCLE = 'lifecycle',
  DYNAMIC = 'dynamic',
  TIME_SPENT = 'time-spent',
  PLANNING = 'planning'
}

export interface ITableMainInfo {
  name: string;
  type: TableTypeEnum;
  tableID: TableID;
}
