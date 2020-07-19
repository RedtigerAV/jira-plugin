import { ILinearChartContext } from './context.interface';
import { ChartID } from '@core/interfaces/structure.interfaces';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { forkJoin, Observable } from 'rxjs';
import { IChartSeries, ILinearChartData } from '../../interfaces/chart-data.interfaces';
import { BugsWeightSettingsBuilder } from '../settings-builders/bugs-weight-settings.builder';
import { FormBuilder } from '@ng-stack/forms';
import { IssueBeanModel } from '@core/api/platform/model/issueBean';
import { PriorityModel } from '@core/api/platform/model/priority';
import { getEndOfDate, getStartOfDate } from '@core/helpers/date.helpers';
import { map, switchMap } from 'rxjs/operators';
import { BoardConfiguration } from '@core/api/software/model/boardConfiguration';
import { StatusDetailsModel } from '@core/api/platform/model/statusDetails';
import { BoardsService } from '@core/api/software/api/boards.service';
import { WorkflowStatusesService } from '@core/api/platform/api/workflowStatuses.service';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { DatePipe } from '@angular/common';
import { dateRequestFormat } from '@core/common-configuration/dates.configuration';
import { IssuePrioritiesService } from '@core/api/platform/api/issuePriorities.service';
import { retryRequestOperator } from '@core/rxjs-operators/request-retry/retry-request.operator';
import { SearchResultsModel } from '@core/api/platform/model/searchResults';
import {
  ISSUES_DEFAULT_PAGE_SIZE, issuesIncrementArgumentsRule,
  issuesSearchRetryRule,
  issuesValuesMapper
} from '@core/rxjs-operators/request-retry/retry-request-default.options';

export interface IDateChartSeries extends IChartSeries {
  date?: Date;
}

export class BugsWeightContext implements ILinearChartContext {
  public chartID = ChartID.BUGS_WEIGHT;
  public settingsBuilder = new BugsWeightSettingsBuilder(this.fb);
  public title = 'Вес багов';
  public xAxisLabel = 'Дата';
  public yAxisLabel = 'Вес багов';

  constructor(public readonly issueSearchService: IssueSearchService,
              public readonly issuePrioritiesService: IssuePrioritiesService,
              public readonly boardsService: BoardsService,
              public readonly workflowStatusesService: WorkflowStatusesService,
              public readonly datePipe: DatePipe,
              public readonly fb: FormBuilder) {
  }

  public destroy(): void {
    this.settingsBuilder.destroy();
  }

  public getData(settings: ISettingsPanelForm): Observable<ILinearChartData[]> {
    const projectID = settings.project.id;
    const boardID = settings.board.id.toString(10);
    const startDate = getStartOfDate(settings.startDate);
    const endDate = getEndOfDate(settings.endDate);
    const searchPriorities$ = this.issuePrioritiesService.getPriorities();
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

          return statuses;
        }),
      );

    return forkJoin(
      searchStatuses$,
      searchPriorities$
    )
      .pipe(
        switchMap(([statuses, priorities]) => {
          const doneStatuses = statuses.filter(({statusCategory}) => statusCategory.key === 'done').map(({id}) => id);
          const notDoneStatuses = statuses.filter(({statusCategory}) => statusCategory.key !== 'done').map(({id}) => id);
          //tslint:disable
          const jql = [
            `project=${projectID}`,
            `type=Bug`,
            [
              `((created < "${this.datePipe.transform(startDate, dateRequestFormat)}" AND status NOT IN (${doneStatuses.join(',')}))`,
              `(status WAS IN (${notDoneStatuses.join(',')}) DURING ("${this.datePipe.transform(startDate, dateRequestFormat)}", "${this.datePipe.transform(endDate, dateRequestFormat)}")))`
            ].join(' OR '),
          ]
            .join(' AND ');
          //tslint:enable

          return retryRequestOperator<SearchResultsModel, IssueBeanModel>(
            this.issueSearchService,
            this.issueSearchService.searchForIssuesUsingJql,
            [jql, 0, ISSUES_DEFAULT_PAGE_SIZE, undefined, undefined, 'changelog'],
            issuesValuesMapper,
            issuesSearchRetryRule,
            issuesIncrementArgumentsRule
          )
            .pipe(
              map(issues => this.transformData(issues, priorities, doneStatuses, startDate, endDate))
            )
        })
      );
  }

  private transformData(
    issues: IssueBeanModel[],
    priorities: PriorityModel[],
    doneStatuses: string[],
    startDate: Date,
    endDate: Date
  ): ILinearChartData[] {
    const prioritiesClone = priorities.slice();

    const prioritiesValues = prioritiesClone
      .reverse()
      .reduce((acc, priority, index) => {
        if (index === 0) {
          acc[priority.id] = 0;
        }

        acc[priority.id] = Math.pow(10, index - 1);

        return acc;
      }, {});

    const series: IDateChartSeries[] = [];
    const currentDate = new Date(startDate.toString());
    endDate = new Date() < endDate ? getEndOfDate(new Date()) : endDate;

    while (currentDate < endDate) {
      series.push({
        name: this.datePipe.transform(currentDate, 'dd.MM.yyyy'),
        date: new Date(currentDate.toString()),
        value: 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    issues.forEach(issue => {
      const issuePriority = issue.fields['priority'] && issue.fields['priority']['id'];
      const issuePriorityValue = prioritiesValues[issuePriority] || 0;
      const issueCreated = new Date(issue.fields['created'].toString());
      let finishIssueFlag = false;

      if (!issue.changelog || !issue.changelog.histories || !issue.changelog.histories.length) {
        series.forEach(data => {
          if (getEndOfDate(data.date) >= issueCreated) {
            data.value += issuePriorityValue;
          }
        });
      } else if (issuePriority) {
        const histories = issue.changelog.histories
          .filter(({created}) => new Date(created.toString()) >= startDate && new Date(created.toString()) <= endDate);

        histories.forEach(changes => {
          const changesCreated = getStartOfDate(new Date(changes.created.toString()));

          changes.items.forEach(change => {
            if (!finishIssueFlag && change.field.toLowerCase() === 'status' && doneStatuses.includes(change.to)) {
              finishIssueFlag = true;
              series.forEach(data => {
                if (getEndOfDate(data.date) >= issueCreated && data.date < changesCreated) {
                  data.value += issuePriorityValue;
                }
              });
            }
          });
        });

        if (!finishIssueFlag) {
          series.forEach(data => {
            if (getEndOfDate(data.date) >= issueCreated) {
              data.value += issuePriorityValue;
            }
          });
        }
      }
    });

    return [
      {
        name: 'Вес багов',
        series
      }
    ]
  }
}
