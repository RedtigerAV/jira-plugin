import { RecordTableTypesEnum, ReportTableTypesEnum } from '@core/enums/tables.enum';

export type TableMainInfo = IReportTableMainInfo | IRecordTableMainInfo;

export interface IReportTableMainInfo extends ITableMainInfo {
  type: ReportTableTypesEnum;
}

export interface IRecordTableMainInfo extends ITableMainInfo {
  type: RecordTableTypesEnum;
}

export interface ITableMainInfo {
  name: string;
  routerLink: string;
  classSuffix: string;
}
