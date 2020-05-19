import { ProjectModel } from '@core/api/platform/model/project';
import { Board } from '@core/api/software/model/board';
import { Sprint } from '@core/api/software/model/sprint';
import { NgStackFormControl } from '@shared/helpers/types.helper';
import { FoundGroupModel } from '@core/api/platform/model/foundGroup';

export enum SettingsPanelPeriodTypesEnum {
  DATE = 'by-date',
  SPRINT = 'by-sprint'
}

export interface ISettingsPanelForm {
  project: string;
  projectPreview?: NgStackFormControl<ProjectModel>;
  board?: string;
  boardPreview?: NgStackFormControl<Board>;
  group?: string;
  groupPreview?: NgStackFormControl<FoundGroupModel>;
  periodBy?: string;
  startDate?: NgStackFormControl<Date>;
  endDate?: NgStackFormControl<Date>;
  fromSprint?: string;
  fromSprintPreview?: NgStackFormControl<Sprint>;
  toSprint?: string;
  toSprintPreview?: NgStackFormControl<Sprint>;
}
