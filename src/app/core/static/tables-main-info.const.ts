import { ITableMainInfo, TableID, TableTypeEnum } from '@core/interfaces/table-main-info.interface';

export const reportsTableMainInfo: ITableMainInfo[] = [
  {
    name: 'Tasks lifecycle registry',
    type: TableTypeEnum.REPORT,
    tableID: TableID.LIFECYCLE
  },
  {
    name: 'Dynamics of the tasks',
    type: TableTypeEnum.REPORT,
    tableID: TableID.DYNAMIC
  },
  {
    name: 'Total time spent',
    type: TableTypeEnum.REPORT,
    tableID: TableID.TIME_SPENT
  }
];

export const recordsTableMainInfo: ITableMainInfo[] = [
  {
    name: 'Planning',
    type: TableTypeEnum.RECORD,
    tableID: TableID.PLANNING
  }
];

export const tablesMainInfo: Array<ITableMainInfo> = [
  ...reportsTableMainInfo,
  ...recordsTableMainInfo
];
