import { ISettingsPanelFormBuilder } from '@core/interfaces/settings-panel-form-builder.interfaces';
import { ChartID } from '@core/interfaces/structure.interfaces';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { Observable } from 'rxjs';
import { ILinearChartData } from '../../interfaces/chart-data.interfaces';

export interface ILinearChartContext {
  chartID: ChartID;
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  settingsBuilder: ISettingsPanelFormBuilder;
  getData(settings: ISettingsPanelForm): Observable<ILinearChartData[]>;
  destroy(): void;
}
