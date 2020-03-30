import { TableID } from '@core/interfaces/table-main-info.interface';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { IReportSettings } from './report-settings.interfaces';
import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { Observable } from 'rxjs';

export interface IReportContext {
  title: string;
  tableID: TableID;
  hiddenControls?: BooleanFormState<IReportSettings>;
  disabledControls?: BooleanFormState<IReportSettings>;
  defaultControlsValue?: IReportSettings;
  getTableColumnsDef(): Observable<ITableColumn[]>;
  getTableDefaultColumnsDef(): Observable<ITableDefaultColumn>;
  getTableData(tableID: TableID, settings: IReportSettings): Observable<any>;
}
