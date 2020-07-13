import { Injectable } from '@angular/core';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { ITableColumn, ITableColumnPinEnum, ITableDefaultColumn } from '../interfaces/table-column.interfaces';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { Sprint } from '@core/api/software/model/sprint';
import { IPlanningStorage, PlanningStorageService } from '@core/services/planning-storage.service';
import { UserPickerUserModel } from '@core/api/platform/model/userPickerUser';

/**
 * plan_info: { sprintID: {userID: number } }
 */

interface IPlanningRowModel {
  user?: {
    accountId: string;
    displayName?: string;
  },
  [key: string]: number | object
}

@Injectable()
export class PlanningService {
  public defaultColumnsDef: ITableDefaultColumn = {
    flex: 1,
    minWidth: 150,
    minHeight: 100,
    resizable: true
  };

  constructor(private readonly sprintsService: SprintsService,
              private readonly planningStorageService: PlanningStorageService) {}

  public getColumnsDef(settings: ISettingsPanelForm): Observable<ITableColumn[]> {
    const boardID = settings.board.id.toString(10);

    return this.sprintsService.searchSprints(boardID, 'active,closed,future')
      .pipe(
        map(({values}) => values),
        map((sprints: Sprint[]) => ([
          {
            field: 'user',
            headerName: 'Пользователь',
            cellRenderer: params => `${params.value.displayName}`,
            pinned: ITableColumnPinEnum.LEFT
          },
          ...sprints.reverse().map(sprint => ({
            field: sprint.id.toString(),
            headerName: sprint.name,
            editable: true
          }))
        ]))
      );
  }

  /**
   * Получаю список всех спринтов
   * Получаю список пользователей группы
   * Получаю данные о предыдущих планированиях
   * @param settings
   */
  public getTableData(settings: ISettingsPanelForm): Observable<any> {
    const boardID = settings.board.id.toString(10);
    const searchSprints$ = this.sprintsService.searchSprints(boardID, 'active,closed,future')
      .pipe(map(({values}) => values));
    const users = settings.users || [];

    return forkJoin(
      searchSprints$,
      this.planningStorageService.getPlanningStorage(boardID)
    )
      .pipe(
        map(([sprints, planning]) => this.transformData(sprints, users as UserPickerUserModel[], planning))
      )
  }

  public updateTableData(boardID: string, rowData: IPlanningRowModel[]): Observable<any> {
    const planning = {};

    rowData.forEach(data => {
      const accountID = data.user.accountId;

      planning[accountID] = {};

      Object.keys(data).forEach(key => {
        if (key !== 'user') {
          planning[accountID][key] = (Number(data[key]) || 0) * 3600;
        }
      });
    });

    return this.planningStorageService.setPlanningStorage(boardID, planning);
  }

  private transformData(sprints: Sprint[], users: UserPickerUserModel[], planning: IPlanningStorage): IPlanningRowModel[] {
    const result: IPlanningRowModel[] = [];

    users.forEach(user => {
      const row: IPlanningRowModel = {
        user: {
          accountId: user.accountId,
          displayName: user.displayName
        }
      };

      sprints.forEach(sprint => {
        row[sprint.id.toString()] = (planning && planning[user.accountId] && planning[user.accountId][sprint.id.toString()] || 0) / 3600;
      });

      result.push(row);
    });

    return result;
  }
}
