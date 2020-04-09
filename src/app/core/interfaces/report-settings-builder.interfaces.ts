import { BooleanFormState } from '@shared/helpers/types.helper';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { FormGroup } from '@ng-stack/forms';

export interface IReportSettingsBuilder {
  hiddenControls?: BooleanFormState<IReportSettings>;
  getSettingsFromGroup(model?: IReportSettings): FormGroup<IReportSettings>;
}
