import { BooleanFormState } from '@shared/helpers/types.helper';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { FormBuilder } from '@ng-stack/forms';
import { SettingsBuilderBase } from '@core/base/settings-builder.base';

export class TimeSpentReportSettingsBuilder extends SettingsBuilderBase {
  public displayedControls: BooleanFormState<ISettingsPanelForm> = {
    project: true,
    projectPreview: true,
    board: true,
    boardPreview: true,
    fromSprint: true,
    toSprint: true,
    fromSprintPreview: true,
    toSprintPreview: true
  };

  constructor(public fb: FormBuilder) {
    super(fb);
  }
}
