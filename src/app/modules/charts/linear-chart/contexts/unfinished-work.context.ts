import { ILinearChartContext } from './context.interface';
import { ChartID } from '@core/interfaces/structure.interfaces';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { Observable } from 'rxjs';
import { IChartSeries, ILinearChartData } from '../../interfaces/chart-data.interfaces';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { map, switchMap } from 'rxjs/operators';
import { IssueBeanModel } from '@core/api/platform/model/issueBean';
import { Sprint } from '@core/api/software/model/sprint';
import { getAllSprints } from '@core/helpers/issues.helpers';
import { UnfinishedWorkSettingsBuilder } from '../settings-builders/unfinished-work-settings.builder';
import { FormBuilder } from '@ng-stack/forms';
import { filterSprintsByDates, getStartEndDatesFromSprints } from '@core/helpers/sprint.helpers';
import { retryRequestOperator } from '@core/rxjs-operators/request-retry/retry-request.operator';
import { PaginatedSprints } from '@core/api/software/model/paginatedSprints';
import {
  ISSUES_DEFAULT_PAGE_SIZE, issuesIncrementArgumentsRule, issuesSearchRetryRule, issuesValuesMapper,
  SPRINTS_DEFAULT_PAGE_SIZE, sprintsIncrementArgumentsRule,
  sprintsSearchRetryRule,
  sprintsValuesMapper
} from '@core/rxjs-operators/request-retry/retry-request-default.options';
import { SearchResultsModel } from '@core/api/platform/model/searchResults';

export class UnfinishedWorkContext implements ILinearChartContext {
  public chartID: ChartID;
  public controlsDisplay: 'row' | 'column' = 'row';
  public settingsBuilder = new UnfinishedWorkSettingsBuilder(this.fb);
  public title = 'Процент работы, незавершенной в спринт';
  public xAxisLabel = 'Спринты';
  public yAxisLabel = 'Процент';
  public yScaleMax = 100;

  constructor(
    private readonly sprintsService: SprintsService,
    private readonly issueSearchService: IssueSearchService,
    private readonly fb: FormBuilder
  ){}

  public destroy(): void {
    this.settingsBuilder.destroy();
  }

  public getData(settings: ISettingsPanelForm): Observable<ILinearChartData[]> {
    const projectID = settings.project.id;
    const boardID = settings.board.id.toString(10);
    const { startDate, endDate } = getStartEndDatesFromSprints(settings.fromSprint as Sprint, settings.toSprint as Sprint);

    return retryRequestOperator<PaginatedSprints, Sprint>(
      this.sprintsService,
      this.sprintsService.searchSprints,
      [boardID, 'active,closed', 0, SPRINTS_DEFAULT_PAGE_SIZE],
      sprintsValuesMapper,
      sprintsSearchRetryRule,
      sprintsIncrementArgumentsRule
    )
      .pipe(
        map(sprints => filterSprintsByDates(sprints, startDate, endDate)),
        switchMap(sprints => {
          const jql = [
            `project=${projectID}`,
            `sprint in (${sprints.map(({id}) => id).join(',')})`
          ]
            .join(' AND ');

          return retryRequestOperator<SearchResultsModel, IssueBeanModel>(
            this.issueSearchService,
            this.issueSearchService.searchForIssuesUsingJql,
            [jql, 0, ISSUES_DEFAULT_PAGE_SIZE, undefined, undefined, 'changelog'],
            issuesValuesMapper,
            issuesSearchRetryRule,
            issuesIncrementArgumentsRule
          )
            .pipe(
              map(issues => this.transformData(issues, sprints))
            )
        })
      );
  }

  private transformData(issues: IssueBeanModel[], sprints: Sprint[]): ILinearChartData[] {
    const result: IChartSeries[] = [];
    const timeAggregator = new Map<string, {unfinished: number, all: number}>();

    sprints.forEach(sprint => {
      timeAggregator.set(sprint.id.toString(), {unfinished: 0, all: 0});
    });

    issues.forEach(issue => {
      const allSprints = getAllSprints(issue).filter(issueSprint => sprints.some(sprint => sprint.id === issueSprint.id));;
      let time = Number(issue.fields['timeoriginalestimate'] || 0) / 3600;
      const isFinished = issue.fields['status']['statusCategory']['key'] === 'done';

      allSprints.forEach((issueSprint, index) => {
        issue.changelog.histories.forEach(changes => {
          const created = new Date(changes.created);

          if (new Date(issueSprint.completeDate || issueSprint.endDate) >= created) {
            changes.items.forEach(change => {
              if (change.field.toLowerCase() === 'timeoriginalestimate') {
                time = Number(change.to || 0) / 3600;
              }
            });
          }
        });

        if (index !== allSprints.length - 1 || !isFinished) {
          timeAggregator.get(issueSprint.id.toString()).unfinished += time;
        }

        timeAggregator.get(issueSprint.id.toString()).all += time;
      });
    });

    sprints.forEach(sprint => {
      const unfinished = timeAggregator.get(sprint.id.toString()).unfinished;
      const all = timeAggregator.get(sprint.id.toString()).all;

      result.push({
        name: sprint.name,
        value: all !== 0 ? Number(((unfinished / all) * 100).toFixed(2)) : 0
      })
    });

    return [
      {
        name: 'Незавершенная работа, %',
        series: result
      }
    ];
  }
}
