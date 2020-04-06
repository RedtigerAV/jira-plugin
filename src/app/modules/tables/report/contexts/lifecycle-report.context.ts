import { IReportContext } from '../interfaces/report-context.interfaces';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { Observable, of } from 'rxjs';
import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { getColumnsDef, getDefaultColumnDefs } from '../mocks/lifecycle.mocks';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { FormBuilder } from '@ng-stack/forms';
import { LifecycleReportSettingsBuilder } from '../report-settings-builders/lifecycle-report-settings.builder';

export class LifecycleReportContext implements IReportContext {
  title = 'Tasks lifecycle report';
  tableID = TableID.LIFECYCLE;
  settingsBuilder = new LifecycleReportSettingsBuilder(this.fb);

  constructor(public http: HttpClient,
              public fb: FormBuilder) {}

  getTableColumnsDef(): Observable<ITableColumn[]> {
    return of(getColumnsDef());
  }

  getTableData(tableID: TableID, settings: IReportSettings): Observable<any> {
    return this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json')
      .pipe(delay(3000));
  }

  getTableDefaultColumnsDef(): Observable<ITableDefaultColumn> {
    return of(getDefaultColumnDefs());
  }
}
