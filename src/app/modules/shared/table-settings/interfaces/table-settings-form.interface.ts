export enum TableSettingsPeriodTypesEnum {
  DATE = 'by-date',
  SPRINT = 'by-sprint'
}

export interface ITableSettingsForm {
  project: string;
  board: string;
  periodType: TableSettingsPeriodTypesEnum;
  sprint?: string;
  startDate?: string;
  endDate?: string;
}
