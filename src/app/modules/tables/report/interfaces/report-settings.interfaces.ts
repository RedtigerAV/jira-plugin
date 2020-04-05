import { FormGroup } from '@ng-stack/forms';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';

export interface IReportSettingsComponent {
  form: FormGroup<IReportSettings>;
  applyDefaultSettings(): void;
  saveSettingsAsDefault(): void;
}
