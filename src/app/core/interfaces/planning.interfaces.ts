import { NgStackFormControl } from '@shared/helpers/types.helper';
import { ProjectModel } from '@core/api/platform/model/project';
import { Board } from '@core/api/software/model/board';

export interface IPlanningSettings {
  project: string;
  projectPreview?: NgStackFormControl<ProjectModel>;
  board?: string;
  boardPreview?: NgStackFormControl<Board>;
}
