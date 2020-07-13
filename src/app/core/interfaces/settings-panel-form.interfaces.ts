import { ProjectModel } from '@core/api/platform/model/project';
import { Board } from '@core/api/software/model/board';
import { Sprint } from '@core/api/software/model/sprint';
import { Control } from '@ng-stack/forms';
import { UserPickerUserModel } from '@core/api/platform/model/userPickerUser';

export enum SettingsPanelPeriodTypesEnum {
  DATE = 'by-date',
  SPRINT = 'by-sprint'
}

export interface ISettingsPanelForm {
  project?: Control<Partial<ProjectModel>>;
  board?: Control<Partial<Board>>;
  users?: Control<Partial<UserPickerUserModel>>;
  periodBy?: SettingsPanelPeriodTypesEnum;
  startDate?: Control<Date>;
  endDate?: Control<Date>;
  fromSprint?: Control<Partial<Sprint>>;
  toSprint?: Control<Partial<Sprint>>;
}
