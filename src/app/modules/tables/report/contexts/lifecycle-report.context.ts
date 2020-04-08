import { IReportContext } from '../interfaces/report-context.interfaces';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { Observable, of } from 'rxjs';
import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { tableData } from '../mocks/lifecycle.mocks';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { FormBuilder } from '@ng-stack/forms';
import { LifecycleReportSettingsBuilder } from '../report-settings-builders/lifecycle-report-settings.builder';
import { TableFilterEnum } from '@core/interfaces/table-filter.interfaces';
import { DatePipe } from '@angular/common';

export class LifecycleReportContext implements IReportContext {
  title = 'Tasks lifecycle report';
  tableID = TableID.LIFECYCLE;
  settingsBuilder = new LifecycleReportSettingsBuilder(this.fb);

  private readonly datePipe: DatePipe;

  constructor(public http: HttpClient,
              public fb: FormBuilder,
              public locale: string) {
    this.datePipe = new DatePipe(locale);
  }

  getTableColumnsDef(): Observable<ITableColumn[]> {
    return of([
      {
        field: 'issueLink',
        headerName: 'Issue Link',
        filter: TableFilterEnum.TEXT,
        minWidth: 200,
        cellRenderer: params => `<a href="${params.value}" target="_blank" style="cursor: pointer">${params.value}</a>`
      },
      {
        field: 'issueName',
        headerName: 'Issue Name',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'assignee',
        headerName: 'Assignee',
        filter: TableFilterEnum.TEXT
      },
      // {
      //   field: 'date',
      //   headerName: 'Date',
      //   filter: TableFilterEnum.DATE,
      //   cellRenderer: params => `${this.datePipe.transform(params.value, 'HH:mm dd.MM.yyyy')}`
      // },
      {
        field: 'sprint',
        headerName: 'Sprint',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'estimation',
        headerName: 'Estimation',
        filter: TableFilterEnum.NUMBER
      },
      {
        field: 'timeSpent',
        headerName: 'Time spent',
        filter: TableFilterEnum.NUMBER
      },
      {
        field: 'status',
        headerName: 'Status',
        filter: TableFilterEnum.TEXT
      }
    ]);
  }

  getTableData(tableID: TableID, settings: IReportSettings): Observable<any> {
    // return this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json')
    //   .pipe(delay(3000));

    return of(tableData()).pipe(delay(2000));
  }

  getTableDefaultColumnsDef(): Observable<ITableDefaultColumn> {
    return of({
      flex: 1,
      minWidth: 150,
      minHeight: 100,
      sortable: true,
      resizable: true,
      filterParams: {
        applyButton: true,
        resetButton: true,
      }
    });
  }
}
