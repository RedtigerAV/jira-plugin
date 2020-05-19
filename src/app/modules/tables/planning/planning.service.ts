import { Injectable } from '@angular/core';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { ITableColumn, ITableColumnPinEnum, ITableDefaultColumn } from '../interfaces/table-column.interfaces';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class PlanningService {
  public defaultColumnsDef: ITableDefaultColumn = {
    flex: 1,
    minWidth: 150,
    minHeight: 100,
    resizable: true
  };

  public getColumnsDef(settings: ISettingsPanelForm): Observable<ITableColumn[]> {
    return of([
      {
        field: 'user',
        headerName: 'Пользователь',
        pinned: ITableColumnPinEnum.LEFT
      },
      {
        field: 'sprint1',
        headerName: 'Доска Спринт 1',
        editable: true
      },
      {
        field: 'sprint2',
        headerName: 'Доска Спринт 2',
        editable: true
      },
      {
        field: 'sprint3',
        headerName: 'Доска Спринт 3',
        editable: true
      }
    ])
      .pipe(delay(800));
  }

  public getTableData(settings: ISettingsPanelForm): Observable<any> {
    return of([
      {
        user: 'Andrew',
        sprint1: 0,
        sprint2: 30,
        sprint3: 30
      },
      {
        user: 'Anton Vakhrushin',
        sprint1: 30,
        sprint2: 25,
        sprint3: 25
      },
      {
        user: 'Ekaterina',
        sprint1: 15,
        sprint2: 15,
        sprint3: 30
      },
    ])
      .pipe(delay(800));
  }
}
