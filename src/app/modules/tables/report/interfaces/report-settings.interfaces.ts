import { FormGroup } from '@ng-stack/forms';

export interface IReportSettingsComponent {
  form: FormGroup<IReportSettings>;
  applyDefaultSettings(): void;
  saveSettingsAsDefault(): void;
}

export enum ReportPeriodTypesEnum {
  DATE = 'by-date',
  SPRINT = 'by-sprint'
}

export interface IReportSettings {
  project: string;
  board: string;
  periodType: ReportPeriodTypesEnum;
  sprintFrom?: string;
  sprintTo?: string;
  startDate?: string;
  endDate?: string;
}
