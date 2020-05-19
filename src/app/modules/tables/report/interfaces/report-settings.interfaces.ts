import { FormGroup } from '@ng-stack/forms';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';

export interface IReportSettingsComponent {
  form: FormGroup<ISettingsPanelForm>;
  applyDefaultSettings(): void;
  saveSettingsAsDefault(): void;
}
