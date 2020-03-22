import { ReportID } from '@core/interfaces/table-main-info.interface';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { IReportSettings } from './report-settings.interfaces';

export interface IReportContext {
  title: string;
  reportID: ReportID;
  hiddenControls: BooleanFormState<IReportSettings>;
  disabledControls: BooleanFormState<IReportSettings>;
  defaultControlsValue: IReportSettings;
  getTableStructure(): object;
  getTableData(reportID: ReportID, settings: IReportSettings): object;
}
