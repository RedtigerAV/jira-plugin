import { TableID } from '@core/interfaces/structure.interfaces';
import { ITableColumn, ITableDefaultColumn } from '../../interfaces/table-column.interfaces';
import { Observable } from 'rxjs';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { ISettingsPanelFormBuilder } from '@core/interfaces/settings-panel-form-builder.interfaces';

export interface IReportContext {
  title: string;
  tableID: TableID;
  settingsBuilder: ISettingsPanelFormBuilder;
  getTableColumnsDef(settings?: ISettingsPanelForm): Observable<ITableColumn[]>;
  getTableDefaultColumnsDef(): Observable<ITableDefaultColumn>;
  getTableData(settings: ISettingsPanelForm): Observable<any>;
  destroy(): void;
}
