import { SettingsBuilderBase } from '@core/base/settings-builder.base';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { FormBuilder } from '@ng-stack/forms';

export class BugsWeightSettingsBuilder extends SettingsBuilderBase {
  public displayedControls: BooleanFormState<ISettingsPanelForm> = {
    project: true,
    board: true,
    startDate: true,
    endDate: true
  };

  constructor(public fb: FormBuilder) {
    super(fb);
  }
}
