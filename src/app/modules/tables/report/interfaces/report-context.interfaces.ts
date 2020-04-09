import { TableID } from '@core/interfaces/table-main-info.interface';
import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { Observable } from 'rxjs';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { IReportSettingsBuilder } from '@core/interfaces/report-settings-builder.interfaces';

export interface IReportContext {
  title: string;
  tableID: TableID;
  settingsBuilder: IReportSettingsBuilder;
  getTableColumnsDef(): Observable<ITableColumn[]>;
  getTableDefaultColumnsDef(): Observable<ITableDefaultColumn>;
  getTableData(tableID: TableID, settings: IReportSettings): Observable<any>;
}
