import { BooleanFormState } from '@shared/helpers/types.helper';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { FormGroup } from '@ng-stack/forms';

export interface ISettingsPanelFormBuilder {
  displayedControls: BooleanFormState<ISettingsPanelForm>;
  getSettingsFromGroup(model?: ISettingsPanelForm): FormGroup<ISettingsPanelForm>;
}
