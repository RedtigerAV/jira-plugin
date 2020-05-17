import { IReportContext } from '../interfaces/report-context.interfaces';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { Observable, of } from 'rxjs';
import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { map, switchMap } from 'rxjs/operators';
import { IReportSettings, ReportPeriodTypesEnum } from '@core/interfaces/report-settings.interfaces';
import { FormBuilder } from '@ng-stack/forms';
import { LifecycleReportSettingsBuilder } from '../report-settings-builders/lifecycle-report-settings.builder';
import { TableFilterEnum } from '@core/interfaces/table-filter.interfaces';
import { DatePipe } from '@angular/common';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { SearchResultsModel } from '@core/api/platform/model/searchResults';
import { basePath } from '@core/common-configuration/global';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { Sprint } from '@core/api/software/model/sprint';

interface IssueRowModel {
  link?: string;
  type?: string;
  labels?: string;
  summary?: string;
  assignee?: string;
  date?: string;
  sprint?: string;
  visible?: boolean;
}

const filteredFields = ['status', 'timeoriginalestimate', 'sprint', 'timespent', 'sprint'];
const watchedFields = ['assignee', 'summary'];

export class LifecycleReportContext implements IReportContext {
  title = 'Tasks lifecycle report';
  tableID = TableID.LIFECYCLE;
  settingsBuilder = new LifecycleReportSettingsBuilder(this.fb);

  private readonly datePipe: DatePipe;

  constructor(public issueSearchService: IssueSearchService,
              public sprintsService: SprintsService,
              public fb: FormBuilder,
              public locale: string) {
    this.datePipe = new DatePipe(locale);
  }

  /**
   * ToDo: навесить компараторы для сортирвоки
   * ToDo: навесить компараторы для фильтрации
   * ToDo: сделать cellRendering для timeSpent, timeOriginalSpent
   * ToDo: убрать из экспортируемой таблицы знак -> (возможно через переопределение toString)
   */
  getTableColumnsDef(): Observable<ITableColumn[]> {
    return of([
      {
        field: 'link',
        headerName: 'Issue Link',
        filter: TableFilterEnum.TEXT,
        minWidth: 300,
        cellRenderer: params => `<a href="${params.value}" target="_blank" style="cursor: pointer">${params.value}</a>`
      },
      {
        field: 'summary',
        headerName: 'Summary',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'type',
        headerName: 'Type',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'labels',
        headerName: 'Labels',
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
        cellRenderer: params => `${this.datePipe.transform(new Date(params.value), 'HH:mm dd.MM.yyyy')}`
      },
      {
        field: 'sprint',
        headerName: 'Sprint',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'timespent',
        headerName: 'Time Spent',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'timeoriginalestimate',
        headerName: 'Original estimate',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'status',
        headerName: 'Status',
        filter: TableFilterEnum.TEXT
      }
    ]);
  }

  getTableDefaultColumnsDef(): Observable<ITableDefaultColumn> {
    return of({
      flex: 1,
      minWidth: 200,
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

  getTableData(settings: IReportSettings): Observable<any> {
    const projectID = settings.project;
    const boardID = settings.board;
    let startDate: Date;
    let endDate: Date;

    switch (settings.periodBy) {
      case ReportPeriodTypesEnum.SPRINT:
        startDate = new Date(settings.fromSprintPreview.startDate.toString());
        endDate = settings.toSprintPreview.completeDate || settings.toSprintPreview.endDate
          ? new Date((settings.toSprintPreview.completeDate || settings.toSprintPreview.endDate).toString())
          : new Date();
        break;
      case ReportPeriodTypesEnum.DATE:
      default:
        startDate = new Date(settings.startDate.toString());
        endDate = new Date(settings.endDate.toString());
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 1);
        break;
    }

    return this.sprintsService.searchSprints(boardID, 'active,closed')
      .pipe(
        map(({values}) => values),
        map(sprints => this.filterSprints(sprints, startDate, endDate)),
        switchMap(sprints => {
          const jql = [
            `project=${projectID}`,
            `sprint in (${sprints.map(({id}) => id).join(',')})`
          ]
            .join(' AND ');

          return this.issueSearchService.searchForIssuesUsingJql(jql, undefined, 1000, undefined, undefined, 'changelog')
        }),
        map(data => this.transformData(data, startDate, endDate))
      )
  }

  private transformData(data: SearchResultsModel, startDate: Date, endDate: Date): any {
    let result: IssueRowModel[] = [];

    data.issues.forEach(issue => {
      const issueChanges: IssueRowModel[] = [];
      const issueModel: IssueRowModel = {
        link: basePath + '/browse/' + issue.key,
        summary: issue.fields['summary'].toString(),
        assignee: issue.fields['assignee'] && issue.fields['assignee']['displayName'],
        type: issue.fields['issuetype'] && issue.fields['issuetype']['name'],
        labels: issue.fields['labels'].toString()
      };

      if (issue.changelog && issue.changelog.histories) {
        issue.changelog.histories.sort((c1, c2) => new Date(c1.created.toString()).getTime() - new Date(c2.created.toString()).getTime());

        issue.changelog.histories.forEach(changes => {
          const date = changes.created.toString();

          if (new Date(date) >= startDate && new Date(date) <= endDate) {
            changes.items.forEach(change => {
              if (filteredFields.includes(change.field.toLowerCase()) || watchedFields.includes(change.field.toLowerCase())) {
                if (change.field.toLowerCase() === 'sprint') {
                  const fromStrings = change.fromString.split(', ');
                  const toStrings = change.toString.split(', ');

                  (change as any).fromString = fromStrings[fromStrings.length - 1];
                  (change as any).toString = toStrings[toStrings.length - 1];
                }

                issueChanges.push({
                  visible: filteredFields.includes(change.field.toLowerCase()),
                  date,
                  ...issueModel,
                  [change.field.toLowerCase()]: `${change.fromString || ''} ⮕ ${change.toString}`,
                });

                issueModel[change.field.toLowerCase()] = change.toString;
              }
            });
          }
        });
      }

      result = [...result, ...issueChanges];
    });

    result = result.filter(row => row.visible);
    result = result.sort((r1, r2) => new Date(r1.date).getTime() - new Date(r2.date).getTime());

    return result;
  }

  private filterSprints(sprints: Array<Sprint>, startDate: Date, endDate: Date): Array<Sprint> {
    return sprints.filter(sprint => new Date(sprint.startDate) >= startDate || new Date(sprint.completeDate || sprint.endDate) <= endDate);
  }
}
