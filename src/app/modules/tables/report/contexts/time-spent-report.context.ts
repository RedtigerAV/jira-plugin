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
import { getTimeSpentData } from '../data/time-spent.data';
import { TimeSpentReportSettingsBuilder } from '../report-settings-builders/time-spent-report-settings.builder';

interface RowModel {
  user?: string;
  doneNumber?: number;
  doneTime?: number;
  scheduledTime?: number;
  trackedTime?: number;
  sprint?: string;
}

export class TimeSpentReportContext implements IReportContext {
  title = 'Total time spent report';
  tableID = TableID.TIME_SPENT;
  settingsBuilder = new TimeSpentReportSettingsBuilder(this.fb);

  private readonly datePipe: DatePipe;

  constructor(public http: HttpClient,
              public fb: FormBuilder,
              public locale: string) {
    this.datePipe = new DatePipe(locale);
  }

  getTableColumnsDef(): Observable<ITableColumn[]> {
    return of([
      {
        field: 'user',
        headerName: 'Пользователь',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'doneNumber',
        headerName: 'Завершенные задачи, кол-во',
        filter: TableFilterEnum.NUMBER
      },
      {
        field: 'scheduledTime',
        headerName: 'Запланированное время',
        filter: TableFilterEnum.NUMBER
      },
      {
        field: 'doneTime',
        headerName: 'Завершенные задачи, время',
        filter: TableFilterEnum.NUMBER
      },
      {
        field: 'trackedTime',
        headerName: 'Списанное время',
        filter: TableFilterEnum.NUMBER
      },
      {
        field: 'sprint',
        headerName: 'Спринт',
        filter: TableFilterEnum.TEXT
      }
    ]);
  }

  /**
   * Получаю список юзеров по groupname
   * Из спринтов получаю дату начала и конца
   * Получаю необходимый список спринтов
   * Получаю список статусов с statusCategory.key === 'done'
   * Получаю список задач в этих спринтах с найдеными статусами, с changelog // project === x AND sprint in (1, 2, 3) AND status IN (id1, id2)
   * Идем по спринтам. Создаю для этого спринта строки по юзерам (количество решенных задач, затраченное время, originalestimate, запланированное время).
   * Пробегаюсь по всем задачам, фильтрую их по спринту по changelog, по их changelog (timespent)
   * @param settings
   */
  getTableData(settings: IReportSettings): Observable<any> {
    // return this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json')
    //   .pipe(delay(3000));

    return of(getTimeSpentData()).pipe(delay(2000));
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
