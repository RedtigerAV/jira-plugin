import { ProjectModel } from '@core/api/platform/model/project';
import { Board } from '@core/api/software/model/board';
import { Sprint } from '@core/api/software/model/sprint';
import { NgStackFormControl } from '@shared/helpers/types.helper';

export enum ReportPeriodTypesEnum {
  DATE = 'by-date',
  SPRINT = 'by-sprint'
}

export interface IReportSettings {
  project: string;
  projectPreview?: NgStackFormControl<ProjectModel>;
  board?: string;
  boardPreview?: NgStackFormControl<Board>;
  userOrGroup?: NgStackFormControl<any>;
  userOrGroupPreview?: any;
  periodBy: string;
  startDate?: NgStackFormControl<Date>;
  endDate?: NgStackFormControl<Date>;
  fromSprint?: string;
  fromSprintPreview?: NgStackFormControl<Sprint>;
  toSprint?: string;
  toSprintPreview?: NgStackFormControl<Sprint>;
}
