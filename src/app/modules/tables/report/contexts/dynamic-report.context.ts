import { IReportContext } from '../interfaces/report-context.interfaces';
import { TableID } from '@core/interfaces/structure.interfaces';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@ng-stack/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { ITableColumn, ITableDefaultColumn } from '../../interfaces/table-column.interfaces';
import { TableFilterEnum } from '../../interfaces/table-filter.interfaces';
import { ISettingsPanelForm, SettingsPanelPeriodTypesEnum } from '@core/interfaces/settings-panel-form.interfaces';
import { map, switchMap, tap } from 'rxjs/operators';
import { DynamicReportSettingsBuilder } from '../report-settings-builders/dynamic-report-settings.builder';
import { BoardsService } from '@core/api/software/api/boards.service';
import { WorkflowStatusesService } from '@core/api/platform/api/workflowStatuses.service';
import { BoardConfiguration } from '@core/api/software/model/boardConfiguration';
import { StatusDetailsModel } from '@core/api/platform/model/statusDetails';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { Sprint } from '@core/api/software/model/sprint';
import { SearchResultsModel } from '@core/api/platform/model/searchResults';
import { getSprintByDate } from '@core/helpers/issues.helpers';
import { filterSprintsByDates } from '@core/helpers/sprint.helpers';
import { secondsToHoursAndMinutes } from '@core/helpers/time.helpers';

interface RowModel {
  sprint?: string;
  date: string;
  [key: string]: number | string;
}

export class DynamicReportContext implements IReportContext {
  title = 'Динамика выполнения задач';
  tableID = TableID.DYNAMIC;
  settingsBuilder = new DynamicReportSettingsBuilder(this.fb);

  private cachedStatuses: StatusDetailsModel[];
  private readonly datePipe: DatePipe;

  constructor(public boardsService: BoardsService,
              public workflowStatusesService: WorkflowStatusesService,
              public sprintsService: SprintsService,
              public issueSearchService: IssueSearchService,
              public fb: FormBuilder,
              public locale: string) {
    this.datePipe = new DatePipe(locale);
  }

  getTableColumnsDef(settings?:ISettingsPanelForm): Observable<ITableColumn[]> {
    const boardID = settings.board;

    return this.getStatuses(boardID)
      .pipe(
        map((statuses: StatusDetailsModel[]) => ([
          {
            field: 'sprint',
            headerName: 'Спринт',
            filter: TableFilterEnum.TEXT
          },
          {
            field: 'date',
            headerName: 'Дата и время',
            cellRenderer: params => `${this.datePipe.transform(new Date(params.value), 'dd.MM.yyyy')}`
          },
          ...statuses.map(status => this.statusToTableColumn(status)),
          {
            field: 'all',
            headerName: 'Всего задач',
            children: [
              {
                field: 'all$number',
                headerName: 'Всего задач, кол-во',
                filter: TableFilterEnum.NUMBER
              },
              {
                field: 'all$time',
                headerName: 'Всего задач, время',
                filter: TableFilterEnum.NUMBER,
                cellRenderer: params => secondsToHoursAndMinutes(params.value),
              }
            ]
          },
          {
            field: 'left',
            headerName: 'Осталось задач',
            children: [
              {
                field: 'left$number',
                headerName: 'Осталось задач, кол-во',
                filter: TableFilterEnum.NUMBER
              },
              {
                field: 'left$time',
                headerName: 'Осталось задач, время',
                filter: TableFilterEnum.NUMBER,
                cellRenderer: params => secondsToHoursAndMinutes(params.value),
              }
            ]
          }
        ]))
      );
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

  getTableData(settings: ISettingsPanelForm): Observable<any> {
    const projectID = settings.project;
    const boardID = settings.board;
    let startDate: Date;
    let endDate: Date;
    const actualDate = new Date();

    actualDate.setHours(0, 0, 0, 0);

    switch (settings.periodBy) {
      case SettingsPanelPeriodTypesEnum.SPRINT:
        startDate = new Date(settings.fromSprintPreview.startDate.toString());
        endDate = settings.toSprintPreview.completeDate || settings.toSprintPreview.endDate
          ? new Date((settings.toSprintPreview.completeDate || settings.toSprintPreview.endDate).toString())
          : new Date();
        break;
      case SettingsPanelPeriodTypesEnum.DATE:
      default:
        startDate = new Date(settings.startDate.toString());
        endDate = new Date(settings.endDate.toString());
        break;
    }

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (endDate > actualDate) {
      endDate = actualDate;
    }

    endDate.setDate(endDate.getDate() + 1);

    return this.sprintsService.searchSprints(boardID, 'active,closed')
      .pipe(
        map(({values}) => values),
        map(sprints => filterSprintsByDates(sprints, startDate, endDate)),
        switchMap(sprints => {
          const jql = [
            `project=${projectID}`,
            `sprint in (${sprints.map(({id}) => id).join(',')})`
          ]
            .join(' AND ');

          return forkJoin(
            this.getStatuses(boardID),
            this.issueSearchService.searchForIssuesUsingJql(jql, undefined, 1000, undefined, undefined, 'changelog')
          )
            .pipe(
              map(([statuses, data]) => this.transformData(data, sprints, statuses, startDate, endDate))
            )
        })
      );
  }

  private getStatuses(boardID: string): Observable<StatusDetailsModel[]> {
    if (this.cachedStatuses) {
      return of(this.cachedStatuses);
    }

    return forkJoin(
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

          return statuses;
        }),
        tap(statuses => (this.cachedStatuses = statuses))
      );
  }

  private statusToTableColumn(status: StatusDetailsModel): ITableColumn {
    return {
      field: status.id,
      headerName: status.name,
      children: [
        {
          field: status.id + '$number',
          filter: TableFilterEnum.NUMBER,
          headerName: status.name + ', кол-во.'
        },
        {
          field: status.id + '$time',
          filter: TableFilterEnum.NUMBER,
          headerName: status.name + ', время',
          cellRenderer: params => secondsToHoursAndMinutes(params.value),
        }
      ]
    }
  }

  private transformData(data: SearchResultsModel, sprints: Sprint[], statuses: StatusDetailsModel[], startDate: Date, endDate: Date): any {
    function sortIssuesChanges(): void {
      data.issues.forEach(issue => {
        if (issue.changelog && issue.changelog.histories) {
          issue.changelog.histories.sort((c1, c2) => new Date(c1.created.toString()).getTime() - new Date(c2.created.toString()).getTime());
        }
      });
    }

    function setAllAndLeftToRowModel(row: RowModel): void {
      let allNumber = 0;
      let allTime = 0;
      let leftNumber = 0;
      let leftTime = 0;

      statuses.forEach(({id, statusCategory}) => {
        const rowTimeKey = `${id}$time`;
        const rowNumberKey = `${id}$number`;

        if (statusCategory.key !== 'done') {
          leftNumber += Number(row[rowNumberKey]);
          leftTime += Number(row[rowTimeKey]);
        }

        allNumber += Number(row[rowNumberKey]);
        allTime += Number(row[rowTimeKey]);
      });

      row['all$number'] = allNumber;
      row['all$time'] = allTime;
      row['left$number'] = leftNumber;
      row['left$time'] = leftTime;
    }

    function getRowModel(currentDate: Date): RowModel {
      const displayDate = new Date(currentDate.toString());

      displayDate.setDate(currentDate.getDate() - 1);

      const row: RowModel = {
        date: displayDate.toString()
      };
      const currentSprint = sprints.find(sprint =>
        new Date(sprint.startDate.toString()) <= currentDate
        && new Date((sprint.completeDate || sprint.endDate).toString()) >= currentDate
      );

      statuses.forEach(({id}) => {
        row[`${id}$time`] = 0;
        row[`${id}$number`] = 0;
      });

      if (!currentSprint) {
        setAllAndLeftToRowModel(row);

        return row;
      }

      row.sprint = currentSprint.name;

      data.issues.forEach(issue => {
        const estimate: number = Number(issue.fields['timeoriginalestimate']) || 0;
        let sprint = getSprintByDate(issue, currentDate);
        let statusID = issue.fields['status']['id'];

        if (issue.changelog && issue.changelog.histories) {
          const histories = issue.changelog.histories.filter(({created}) => new Date(created.toString()) <= currentDate);

          histories.forEach(changes => {
            changes.items.forEach(change => {
              if (change.field.toLowerCase() === 'status') {
                statusID = change.to;
              }
            });
          });
        }

        if (statusID && sprint && sprint.name === row.sprint) {
          row[`${statusID}$number`] = (row[`${statusID}$number`] as number) + 1;
          row[`${statusID}$time`] = (row[`${statusID}$time`] as number) + estimate;
        }
      });

      setAllAndLeftToRowModel(row);

      return row;
    }

    const result: RowModel[] = [];

    startDate.setDate(startDate.getDate() + 1);
    sortIssuesChanges();

    while (startDate.getTime() <= endDate.getTime()) {
      const row = getRowModel(startDate);

      result.push(row);

      startDate.setDate(startDate.getDate() + 1);
    }

    return result;
  }
}
