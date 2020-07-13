import { ProjectModel } from '@core/api/platform/model/project';
import { Board } from '@core/api/software/model/board';
import { Sprint } from '@core/api/software/model/sprint';
import { FoundGroupModel } from '@core/api/platform/model/foundGroup';
import { Control } from '@ng-stack/forms';

export enum SettingsPanelPeriodTypesEnum {
  DATE = 'by-date',
  SPRINT = 'by-sprint'
}

export interface ISettingsPanelForm {
  project?: Control<Partial<ProjectModel>>;
  board?: Control<Partial<Board>>;
  group?: Control<Partial<FoundGroupModel>>;
  periodBy?: SettingsPanelPeriodTypesEnum;
  startDate?: Control<Date>;
  endDate?: Control<Date>;
  fromSprint?: Control<Partial<Sprint>>;
  toSprint?: Control<Partial<Sprint>>;
}

export interface ISettingsPanel {
  project?: Partial<ProjectModel>;
  board?: Partial<Board>;
  group?: Partial<FoundGroupModel>;
  periodBy?: SettingsPanelPeriodTypesEnum;
  startDate?: Date;
  endDate?: Date;
  fromSprint?: Partial<Sprint>;
  toSprint?: Partial<Sprint>;
}
