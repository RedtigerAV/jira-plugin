import { IReportContext } from '../interfaces/report-context.interfaces';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@ng-stack/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { TableFilterEnum } from '@core/interfaces/table-filter.interfaces';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { map, switchMap } from 'rxjs/operators';
import { TimeSpentReportSettingsBuilder } from '../report-settings-builders/time-spent-report-settings.builder';
import { BoardsService } from '@core/api/software/api/boards.service';
import { WorkflowStatusesService } from '@core/api/platform/api/workflowStatuses.service';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { GroupsService } from '@core/api/platform/api/groups.service';
import { filterSprintsByDates } from '@core/helpers/sprint.helpers';
import { BoardConfiguration } from '@core/api/software/model/boardConfiguration';
import { StatusDetailsModel } from '@core/api/platform/model/statusDetails';
import { Sprint } from '@core/api/software/model/sprint';
import { SearchResultsModel } from '@core/api/platform/model/searchResults';
import { PageBeanUserDetailsModel } from '@core/api/platform/model/pageBeanUserDetails';
import { getCurrentSprint } from '@core/helpers/issues.helpers';

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

  constructor(public boardsService: BoardsService,
              public workflowStatusesService: WorkflowStatusesService,
              public sprintsService: SprintsService,
              public issueSearchService: IssueSearchService,
              public groupsService: GroupsService,
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
        headerName: 'Запланированно часов',
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

  getTableData(settings: IReportSettings): Observable<any> {
    const groupName = settings.group;
    const projectID = settings.project;
    const boardID = settings.board;
    const startDate = new Date(settings.fromSprintPreview.startDate);
    const endDate = new Date(settings.toSprintPreview.completeDate || settings.toSprintPreview.endDate);

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
            this.groupsService.getUsersFromGroup(groupName, false)
          )
            .pipe(
              map(([data, users]) => this.transformData(data, sprints, users))
            );
        })
      );
  }

  destroy(): void {
    this.settingsBuilder.destroy();
  }

  private transformData(data: SearchResultsModel, sprints: Sprint[], users: PageBeanUserDetailsModel): any {
    let result: RowModel[] = [];

    sprints.forEach(sprint => {
      const usersRowMap = new Map<string, RowModel>();

      users.values.forEach(user => {
        usersRowMap.set(user.accountId, {
          user: user.displayName,
          sprint: sprint.name,
          doneNumber: 0,
          doneTime: 0,
          trackedTime: 0,
          scheduledTime: 0
        });
      });

      data.issues.forEach(issue => {
        if (getCurrentSprint(issue).id === sprint.id) {
          const issueUser = issue.fields['assignee']['accountId'];

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
