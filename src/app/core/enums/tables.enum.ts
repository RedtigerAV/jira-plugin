export enum ReportTableTypesEnum {
  LIFECYCLE = 'lifecycle',
  DYNAMIC = 'dynamic',
  TIME_SPENT = 'time-spent'
}

export enum RecordTableTypesEnum {
  PLANNING = 'planning'
}

export type TableType = ReportTableTypesEnum | RecordTableTypesEnum;
