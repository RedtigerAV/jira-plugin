import { IReportContext } from '../interfaces/report-context.interfaces';
import { TableID } from '@core/interfaces/structure.interfaces';
import { Observable, of } from 'rxjs';
import { ITableColumn, ITableColumnPinEnum, ITableDefaultColumn } from '../../interfaces/table-column.interfaces';
import { map, switchMap } from 'rxjs/operators';
import { ISettingsPanelForm, SettingsPanelPeriodTypesEnum } from '@core/interfaces/settings-panel-form.interfaces';
import { FormBuilder } from '@ng-stack/forms';
import { LifecycleReportSettingsBuilder } from '../report-settings-builders/lifecycle-report-settings.builder';
import { TableFilterEnum } from '../../interfaces/table-filter.interfaces';
import { DatePipe } from '@angular/common';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { SearchResultsModel } from '@core/api/platform/model/searchResults';
import { basePath } from '@core/common-configuration/global';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { getCurrentSprint } from '@core/helpers/issues.helpers';
import { filterSprintsByDates } from '@core/helpers/sprint.helpers';
import { DurationMapper } from '../../duration-helpers/duration-mapper';

interface IssueRowModel {
  link?: string;
  type?: string;
  labels?: string;
  summary?: string;
  assignee?: string;
  date?: string;
  sprint?: string;
  changedBy?: string;
  visible?: boolean;
}

const filteredFields = ['status', 'timeoriginalestimate', 'sprint', 'timespent', 'sprint'];
const watchedFields = ['assignee', 'summary'];

export class LifecycleReportContext implements IReportContext {
  title = 'Жизненный цикл задач';
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
   * ToDo: убрать из экспортируемой таблицы знак -> (возможно через переопределение toString)
   */
  getTableColumnsDef(): Observable<ITableColumn[]> {
    return of([
      {
        field: 'summary',
        headerName: 'Название',
        minWidth: 300,
        pinned: ITableColumnPinEnum.LEFT,
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'link',
        headerName: 'Ссылка',
        filter: TableFilterEnum.TEXT,
        minWidth: 300,
        cellRenderer: params => `<a href="${params.value}" target="_blank" style="cursor: pointer">${params.value}</a>`
      },
      {
        field: 'type',
        headerName: 'Тип',
        filter: TableFilterEnum.TEXT,
        minWidth: 130
      },
      {
        field: 'labels',
        headerName: 'Лейблы',
        filter: TableFilterEnum.TEXT,
        minWidth: 130
      },
      {
        field: 'assignee',
        headerName: 'Назначено на',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'changedBy',
        headerName: 'Кем изменено',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'date',
        headerName: 'Время изменения',
        // filter: TableFilterEnum.DATE,
        cellRenderer: params => `${this.datePipe.transform(new Date(params.value), 'HH:mm dd.MM.yyyy')}`
      },
      {
        field: 'sprint',
        headerName: 'Спринт',
        filter: TableFilterEnum.TEXT
      },
      {
        field: 'timespent',
        headerName: 'Потрачено времени',
        filter: TableFilterEnum.TEXT,
        cellRenderer: params => this.timeCellRenderer(params.value),
        comparator: this.durationComparator.bind(this)
      },
      {
        field: 'timeoriginalestimate',
        headerName: 'Оценка задачи',
        filter: TableFilterEnum.TEXT,
        cellRenderer: params => this.timeCellRenderer(params.value),
        comparator: this.durationComparator.bind(this)
      },
      {
        field: 'status',
        headerName: 'Статус',
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

  getTableData(settings: ISettingsPanelForm): Observable<any> {
    const projectID = settings.project;
    const boardID = settings.board;
    let startDate: Date;
    let endDate: Date;

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
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 1);
        break;
    }

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

          return this.issueSearchService.searchForIssuesUsingJql(jql, undefined, 1000, undefined, undefined, 'changelog')
        }),
        map(data => this.transformData(data, startDate, endDate))
      )
  }

  private transformData(data: SearchResultsModel, startDate: Date, endDate: Date): any {
    let result: IssueRowModel[] = [];

    data.issues.forEach(issue => {
      const issueChanges: IssueRowModel[] = [];
      const currentSprint = getCurrentSprint(issue);
      const issueModel: IssueRowModel = {
        link: basePath + '/browse/' + issue.key,
        summary: issue.fields['summary'].toString(),
        assignee: issue.fields['assignee'] && issue.fields['assignee']['displayName'],
        type: issue.fields['issuetype'] && issue.fields['issuetype']['name'],
        labels: issue.fields['labels'].toString(),
        sprint: currentSprint && currentSprint.name
      };

      if (issue.changelog && issue.changelog.histories) {
        issue.changelog.histories.sort((c1, c2) => new Date(c1.created.toString()).getTime() - new Date(c2.created.toString()).getTime());

        issue.changelog.histories.forEach(changes => {
          const date = changes.created.toString();
          const author = changes.author && changes.author.displayName;

          if (new Date(date) >= startDate && new Date(date) <= endDate) {
            changes.items.forEach(change => {
              if (filteredFields.includes(change.field.toLowerCase()) || watchedFields.includes(change.field.toLowerCase())) {
                if (change.field.toLowerCase() === 'sprint') {
                  const fromStrings = change.fromString.split(', ');
                  const toStrings = change.toString.split(', ');

                  (change as any).fromString = fromStrings[fromStrings.length - 1] || 'Бэклог';
                  (change as any).toString = toStrings[toStrings.length - 1] || 'Бэклог';
                }

                issueChanges.push({
                  visible: filteredFields.includes(change.field.toLowerCase()),
                  changedBy: author,
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

  private timeCellRenderer(value: string): string {
    if (!value) {
      return undefined;
    }

    const values = value.split('⮕');

    return values.map(time => DurationMapper.secondsToDuration(time)).join(' ⮕ ');
  }

  private durationComparator(value1: string, value2: string): number {
    value1 = value1 ? value1 : '0';
    value2 = value2 ? value2 : '0';

    const parsedValues1 = value1.split(' ⮕ ');
    const parsedValues2 = value2.split(' ⮕ ');

    console.log(parsedValues1);
    console.log(parsedValues2);

    return parseInt(parsedValues1[parsedValues1.length - 1]) - parseInt(parsedValues2[parsedValues2.length - 1]);
  }
}
