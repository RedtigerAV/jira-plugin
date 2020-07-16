import { IReportContext } from '../interfaces/report-context.interfaces';
import { TableID } from '@core/interfaces/structure.interfaces';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@ng-stack/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { ITableColumn, ITableDefaultColumn } from '../../interfaces/table-column.interfaces';
import { TableFilterEnum } from '../../interfaces/table-filter.interfaces';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { map, switchMap } from 'rxjs/operators';
import { TimeSpentReportSettingsBuilder } from '../report-settings-builders/time-spent-report-settings.builder';
import { BoardsService } from '@core/api/software/api/boards.service';
import { WorkflowStatusesService } from '@core/api/platform/api/workflowStatuses.service';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { filterSprintsByDates, getStartEndDatesFromSprints } from '@core/helpers/sprint.helpers';
import { BoardConfiguration } from '@core/api/software/model/boardConfiguration';
import { StatusDetailsModel } from '@core/api/platform/model/statusDetails';
import { Sprint } from '@core/api/software/model/sprint';
import { SearchResultsModel } from '@core/api/platform/model/searchResults';
import { getCurrentSprint } from '@core/helpers/issues.helpers';
import { IPlanningStorage, PlanningStorageService } from '@core/services/planning-storage.service';
import { DurationMapper } from '../../duration-helpers/duration-mapper';
import { textFilters } from '../../custom-filters/text-filters';
import { durationFilters } from '../../custom-filters/duration-filters';
import { numberFilters } from '../../custom-filters/number-filters';
import { UserPickerUserModel } from '@core/api/platform/model/userPickerUser';

interface RowModel {
  user?: string;
  doneNumber?: number;
  doneTime?: number;
  scheduledTime?: number;
  trackedTime?: number;
  sprint?: string;
}

export class TimeSpentReportContext implements IReportContext {
  title = 'Оценка общего затраченного времени';
  tableID = TableID.TIME_SPENT;
  settingsBuilder = new TimeSpentReportSettingsBuilder(this.fb);

  private readonly datePipe: DatePipe;

  constructor(public boardsService: BoardsService,
              public workflowStatusesService: WorkflowStatusesService,
              public sprintsService: SprintsService,
              public issueSearchService: IssueSearchService,
              public planningStorageService: PlanningStorageService,
              public fb: FormBuilder,
              public locale: string) {
    this.datePipe = new DatePipe(locale);
  }

  getTableColumnsDef(): Observable<ITableColumn[]> {
    return of([
      {
        field: 'user',
        headerName: 'Пользователь',
        filter: TableFilterEnum.TEXT,
        filterParams: {
          applyButton: true,
          resetButton: true,
          filterOptions: textFilters
        }
      },
      {
        field: 'doneNumber',
        headerName: 'Завершенные задачи, кол-во',
        filter: TableFilterEnum.NUMBER,
        sortable: true,
        filterParams: {
          applyButton: true,
          resetButton: true,
          filterOptions: numberFilters
        }
      },
      {
        field: 'scheduledTime',
        headerName: 'Запланированно часов',
        cellRenderer: params => DurationMapper.secondsToDuration(params.value),
        filter: TableFilterEnum.TEXT,
        filterParams: {
          applyButton: true,
          resetButton: true,
          filterOptions: durationFilters
        },
        sortable: true
      },
      {
        field: 'doneTime',
        headerName: 'Завершенные задачи, время',
        cellRenderer: params => DurationMapper.secondsToDuration(params.value),
        filter: TableFilterEnum.TEXT,
        filterParams: {
          applyButton: true,
          resetButton: true,
          filterOptions: durationFilters
        },
        sortable: true
      },
      {
        field: 'trackedTime',
        headerName: 'Списанное время',
        filter: TableFilterEnum.TEXT,
        cellRenderer: params => DurationMapper.secondsToDuration(params.value),
        filterParams: {
          applyButton: true,
          resetButton: true,
          filterOptions: durationFilters
        },
        sortable: true
      },
      {
        field: 'sprint',
        headerName: 'Спринт',
        filter: TableFilterEnum.TEXT,
        filterParams: {
          applyButton: true,
          resetButton: true,
          filterOptions: textFilters
        }
      }
    ]);
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

  getTableData(settings: ISettingsPanelForm): Observable<any> {
    const projectID = settings.project.id;
    const boardID = settings.board.id.toString(10);
    const { startDate, endDate } = getStartEndDatesFromSprints(settings.fromSprint as Sprint, settings.toSprint as Sprint);
    const users = settings.users || [];

    const searchSprints$ = this.sprintsService.searchSprints(boardID, 'active,closed')
      .pipe(
        map(({values}) => values),
        map(sprints => filterSprintsByDates(sprints, startDate, endDate))
      );
    const searchStatuses$ = forkJoin(
      this.boardsService.getBoardConfiguration(boardID),
      this.workflowStatusesService.getStatuses()
    )
      .pipe(
        map(([boardConfiguration, statusesDetails]: [BoardConfiguration, Array<StatusDetailsModel>]) => {
          const statuses: StatusDetailsModel[] =
            boardConfiguration
              .columnConfig
              .columns
              .reduce((acc, value) => [...acc, ...value.statuses], []);

          statuses.forEach(status => {
            const statusDetail = statusesDetails.find(({id}) => id.toString() === status.id.toString());

            (status as any).name = statusDetail.name;
            (status as any).statusCategory = statusDetail.statusCategory;
          });

          return statuses.filter(({statusCategory}) => statusCategory.key === 'done');
        }),
      );

    return forkJoin(searchSprints$, searchStatuses$)
      .pipe(
        switchMap(([sprints, statuses]: [Sprint[], StatusDetailsModel[]]) => {
          const jql = [
            `project=${projectID}`,
            `sprint in (${sprints.map(({id}) => id).join(',')})`,
            `status IN (${statuses.map(({id}) => id).join(',')})`
          ]
            .join(' AND ');

          return forkJoin(
            this.issueSearchService.searchForIssuesUsingJql(jql, undefined, 1000, undefined, undefined, 'changelog'),
            this.planningStorageService.getPlanningStorage(boardID)
          )
            .pipe(
              map(([data, planning]) => this.transformData(data, sprints, users as UserPickerUserModel[], planning))
            );
        })
      );
  }

  destroy(): void {
    this.settingsBuilder.destroy();
  }

  private transformData(data: SearchResultsModel, sprints: Sprint[], users: UserPickerUserModel[], planning: IPlanningStorage): any {
    let result: RowModel[] = [];

    sprints.forEach(sprint => {
      const usersRowMap = new Map<string, RowModel>();

      users.forEach(user => {
        usersRowMap.set(user.accountId, {
          user: user.displayName,
          sprint: sprint.name,
          doneNumber: 0,
          doneTime: 0,
          trackedTime: 0,
          scheduledTime: planning && planning[user.accountId] && planning[user.accountId][sprint.id.toString()] || 0
        });
      });

      data.issues.forEach(issue => {
        const issueUser = issue.fields['assignee'] && issue.fields['assignee']['accountId'];

        if (getCurrentSprint(issue).id === sprint.id && issueUser) {
          usersRowMap.get(issueUser).doneTime += Number(issue.fields['timeoriginalestimate']) || 0;
          usersRowMap.get(issueUser).doneNumber += 1;

          issue.changelog.histories.forEach(changes => {
            const author = changes.author.accountId;

            changes.items.forEach(change => {
              if (change.field.toLowerCase() === 'timespent') {
                usersRowMap.get(author).trackedTime += (Number(change.to) - Number(change.from || 0));
              }
            });
          });
        }
      });

      result = [...result, ...Array.from(usersRowMap).map(value => value[1])];
    });

    return result;
  }
}
