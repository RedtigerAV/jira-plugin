import { IRecordTableMainInfo, IReportTableMainInfo, TableMainInfo } from '@core/interfaces/table-main-info.interface';
import { RecordTableTypesEnum, ReportTableTypesEnum } from '@core/enums/tables.enum';

export const reportsTableMainInfo: IReportTableMainInfo[] = [
  {
    name: 'Tasks lifecycle registry',
    type: ReportTableTypesEnum.LIFECYCLE,
    routerLink: '/lifecycle-table',
    reportID: 'lifecycle'
  },
  {
    name: 'Dynamics of the tasks',
    type: ReportTableTypesEnum.DYNAMIC,
    routerLink: '/dynamic-table',
    reportID: 'dynamic'
  },
  {
    name: 'Total time spent',
    type: ReportTableTypesEnum.TIME_SPENT,
    routerLink: '/time-spent-table',
    reportID: 'time-spent'
  }
];

export const recordsTableMainInfo: IRecordTableMainInfo[] = [
  {
    name: 'Planning',
    type: RecordTableTypesEnum.PLANNING,
    routerLink: '/planning-table',
    reportID: 'planning'
  }
];

export const tablesMainInfo: Array<TableMainInfo> = [
  ...reportsTableMainInfo,
  ...recordsTableMainInfo
];
