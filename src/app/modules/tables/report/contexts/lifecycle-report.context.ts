import { IReportContext } from '../interfaces/report-context.interfaces';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { Observable, of } from 'rxjs';
import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { lifecycleData } from '../data/lifecycle.data';
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
        minWidth: 300,
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
      {
        field: 'date',
        headerName: 'Date and Time',
        // filter: TableFilterEnum.DATE,
        // cellRenderer: params => `${this.datePipe.transform(params.value, 'HH:mm dd.MM.yyyy')}`
      },
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

  /**
   * 1. получаю projectID
   * 2. Если период по датам, то беру обе даты, второй прибавляю день, и обеим добавляю 00:00
   * 3. Если период по спринтам, беру startDate первого спринта, endDate || Date.now второго спринта
   * 4. Делаю запрос /rest/api/3/search с jql, который использует update
   * 5. Пробегаюсь по каждой задаче, внутри нее - по history. Добавляю все в один массив, фильтруя при этом старые changelogs
   * 6. Массив сортирую по дате изменения
   * 7. Возвращаю
   * @param tableID
   * @param settings
   */
  getTableData(tableID: TableID, settings: IReportSettings): Observable<any> {
    // return this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json')
    //   .pipe(delay(3000));

    return of(lifecycleData()).pipe(delay(2000));
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

  destroy(): void {
    this.settingsBuilder.destroy();
  }
}
