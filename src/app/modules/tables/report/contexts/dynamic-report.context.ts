import { IReportContext } from '../interfaces/report-context.interfaces';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@ng-stack/forms';
import { Observable, of } from 'rxjs';
import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { TableFilterEnum } from '@core/interfaces/table-filter.interfaces';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { delay } from 'rxjs/operators';
import { getDynamicData } from '../data/dynamic.data';
import { DynamicReportSettingsBuilder } from '../report-settings-builders/dynamic-report-settings.builder';

export class DynamicReportContext implements IReportContext {
  title = 'Dynamic of the tasks report';
  tableID = TableID.DYNAMIC;
  settingsBuilder = new DynamicReportSettingsBuilder(this.fb);

  private readonly datePipe: DatePipe;

  constructor(public http: HttpClient,
              public fb: FormBuilder,
              public locale: string) {
    this.datePipe = new DatePipe(locale);
  }

  getTableColumnsDef(): Observable<ITableColumn[]> {
    return of([
      {
        field: 'sprint',
        headerName: 'Sprint',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'date',
        headerName: 'Date'
      },
      {
        field: 'todo',
        headerName: 'To Do',
        children: [
          {
            field: 'toDoNumber',
            filter: TableFilterEnum.NUMBER,
            headerName: 'To Do No.'
          },
          {
            field: 'toDoTime',
            filter: TableFilterEnum.NUMBER,
            headerName: 'To Do Time'
          }
        ]
      },
      {
        field: 'inProgress',
        headerName: 'In Progress',
        children: [
          {
            field: 'inProgressNumber',
            filter: TableFilterEnum.NUMBER,
            headerName: 'In Progress No.'
          },
          {
            field: 'inProgressTime',
            filter: TableFilterEnum.NUMBER,
            headerName: 'In Progress Time'
          }
        ]
      },
      {
        field: 'inTesting',
        headerName: 'In Testing',
        children: [
          {
            field: 'inTestingNumber',
            filter: TableFilterEnum.NUMBER,
            headerName: 'In Testing No.'
          },
          {
            field: 'inTestingTime',
            filter: TableFilterEnum.NUMBER,
            headerName: 'In Testing Time'
          }
        ]
      },
      {
        field: 'done',
        headerName: 'Done',
        children: [
          {
            field: 'doneNumber',
            filter: TableFilterEnum.NUMBER,
            headerName: 'Done No.'
          },
          {
            field: 'doneTime',
            filter: TableFilterEnum.NUMBER,
            headerName: 'Done Time'
          }
        ]
      },
      {
        field: 'all',
        headerName: 'All',
        children: [
          {
            field: 'allNumber',
            filter: TableFilterEnum.NUMBER,
            headerName: 'All No.'
          },
          {
            field: 'allTime',
            filter: TableFilterEnum.NUMBER,
            headerName: 'All Time'
          }
        ]
      },
      {
        field: 'left',
        headerName: 'Left',
        children: [
          {
            field: 'leftNumber',
            filter: TableFilterEnum.NUMBER,
            headerName: 'Left No.'
          },
          {
            field: 'leftTime',
            filter: TableFilterEnum.NUMBER,
            headerName: 'Left Time'
          }
        ]
      }
    ]);
  }

  /**
   * 1. Беру дату начала, дату конца. Запрашиваю все спринты и оставляю только подходящие в указанные даты
   * 2. Получаю все задачи по спринтам с changelogs
   * 3.
   * @param tableID
   * @param settings
   */
  getTableData(tableID: TableID, settings: IReportSettings): Observable<any> {
    // return this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json')
    //   .pipe(delay(3000));

    return of(getDynamicData()).pipe(delay(2000));
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
