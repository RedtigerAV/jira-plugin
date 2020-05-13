import { IReportContext } from '../interfaces/report-context.interfaces';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { Observable, of } from 'rxjs';
import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { map } from 'rxjs/operators';
import { IReportSettings, ReportPeriodTypesEnum } from '@core/interfaces/report-settings.interfaces';
import { FormBuilder } from '@ng-stack/forms';
import { LifecycleReportSettingsBuilder } from '../report-settings-builders/lifecycle-report-settings.builder';
import { TableFilterEnum } from '@core/interfaces/table-filter.interfaces';
import { DatePipe } from '@angular/common';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { dateFormat } from '@core/common-configuration/dates.configuration';
import { SearchResultsModel } from '@core/api/platform/model/searchResults';
import { basePath } from '@core/common-configuration/global';

interface IssueRowModel {
  link?: string;
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
              public fb: FormBuilder,
              public locale: string) {
    this.datePipe = new DatePipe(locale);
  }

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

  getTableData(tableID: TableID, settings: IReportSettings): Observable<any> {
    const projectID = settings.project;
    let startDate: Date;
    let endDate: Date;

    switch (settings.periodBy) {
      case ReportPeriodTypesEnum.SPRINT:
        startDate = new Date(settings.fromSprintPreview.startDate.toString());
        endDate = settings.fromSprintPreview.endDate
          ? new Date(settings.fromSprintPreview.endDate.toString())
          : new Date();
        break;
      case ReportPeriodTypesEnum.DATE:
      default:
        startDate = settings.startDate;
        endDate = settings.endDate;
        startDate.setHours(0, 0);
        endDate.setHours(0, 0);
        endDate.setDate(endDate.getDate() + 1);
        break;
    }

    const jql = [
      `project=${projectID}`,
      `updated>="${this.datePipe.transform(startDate, dateFormat)}"`,
      `updated<="${this.datePipe.transform(endDate, dateFormat)}"`,
    ]
      .join(' AND ');

    return this.issueSearchService.searchForIssuesUsingJql(jql, undefined, 1000, undefined, undefined, 'changelog')
      .pipe(map(data => this.transformData(data)));
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

  private transformData(data: SearchResultsModel): any {
    let result: IssueRowModel[] = [];

    data.issues.forEach(issue => {
      const issueChanges: IssueRowModel[] = [];
      const issueModel: IssueRowModel = {
        link: basePath + '/browse/' + issue.key,
        summary: issue.fields['summary'].toString(),
        assignee: issue.fields['assignee'] && issue.fields['assignee']['displayName']
      };

      issue.changelog.histories.sort((c1, c2) => new Date(c1.created.toString()).getTime() - new Date(c2.created.toString()).getTime());

      issue.changelog.histories.forEach(changes => {
        const date = changes.created.toString();

        changes.items.forEach(change => {
          if (filteredFields.includes(change.field.toLowerCase()) || watchedFields.includes(change.field.toLowerCase())) {
            issueChanges.push({
              visible: filteredFields.includes(change.field),
              date,
              ...issueModel,
              [change.field.toLowerCase()]: `${change.fromString || ''} ⮕ ${change.toString}`,
            });

            issueModel[change.field.toLowerCase()] = change.toString;
          }
        });
      });

      result = [...result, ...issueChanges];
    });

    result = result.filter(row => row.visible);
    result = result.sort((r1, r2) => new Date(r1.date).getTime() - new Date(r2.date).getTime());

    return result;
  }
}
