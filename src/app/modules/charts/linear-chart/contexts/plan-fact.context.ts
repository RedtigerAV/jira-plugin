import { ILinearChartContext } from './context.interface';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { forkJoin, Observable } from 'rxjs';
import { ILinearChartData } from '../../interfaces/chart-data.interfaces';
import { ChartID } from '@core/interfaces/structure.interfaces';
import { PlanFactSettingsBuilder } from '../settings-builders/plan-fact-settings.builder';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { IPlanningStorage, PlanningStorageService } from '@core/services/planning-storage.service';
import { FormBuilder } from '@ng-stack/forms';
import { map, switchMap } from 'rxjs/operators';
import { IssueBeanModel } from '@core/api/platform/model/issueBean';
import { Sprint } from '@core/api/software/model/sprint';
import { getAllSprints } from '@core/helpers/issues.helpers';
import { UserPickerUserModel } from '@core/api/platform/model/userPickerUser';
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

export class PlanFactContext implements ILinearChartContext {
  public chartID = ChartID.PLAN_FACT;
  public settingsBuilder = new PlanFactSettingsBuilder(this.fb);
  public title = 'Запланированная и сделанная работа';
  public xAxisLabel = 'Спринты';
  public yAxisLabel = 'Часы';

  constructor(
    public sprintsService: SprintsService,
    public issueSearchService: IssueSearchService,
    public planningStorageService: PlanningStorageService,
    public fb: FormBuilder
  ){}

  public destroy(): void {
    this.settingsBuilder.destroy();
  }

  public getData(settings: ISettingsPanelForm): Observable<ILinearChartData[]> {
    const projectID = settings.project.id;
    const boardID = settings.board.id.toString(10);
    const users = settings.users || [];
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

          return forkJoin(
            retryRequestOperator<SearchResultsModel, IssueBeanModel>(
              this.issueSearchService,
              this.issueSearchService.searchForIssuesUsingJql,
              [jql, 0, ISSUES_DEFAULT_PAGE_SIZE, undefined, undefined, 'changelog'],
              issuesValuesMapper,
              issuesSearchRetryRule,
              issuesIncrementArgumentsRule
            ),
            this.planningStorageService.getPlanningStorage(boardID)
          )
            .pipe(
              map(([issues, planning]) => this.transformData(issues, sprints, users as UserPickerUserModel[], planning))
            )
        })
      );
  }

  private transformData(
    issues: IssueBeanModel[],
    sprints: Sprint[],
    users: UserPickerUserModel[],
    planning: IPlanningStorage
  ): ILinearChartData[] {
    const plan: ILinearChartData = {
      name: 'Запланированное время',
      series: []
    };
    const fact: ILinearChartData = {
      name: 'Сделанная работа',
      series: []
    };
    const timeAggregator = new Map<string, {plan: number, fact: number}>();

    sprints.forEach(sprint => {
      timeAggregator.set(sprint.id.toString(), {plan: 0, fact: 0});
    });
    sprints.forEach(sprint => {
      users.forEach(user => {
        if (planning && planning[user.accountId] && planning[user.accountId][sprint.id.toString()]) {
          timeAggregator.get(sprint.id.toString()).plan += (Number(planning[user.accountId][sprint.id.toString()]) / 3600);
        }
      });
    });

    issues.forEach(issue => {
      const allSprints = getAllSprints(issue).filter(issueSprint => sprints.some(sprint => sprint.id === issueSprint.id));
      let time = Number(issue.fields['timeoriginalestimate'] || 0) / 3600;
      const isFinished = issue.fields['status']['statusCategory']['key'] === 'done';
      const issueUserID = issue.fields['assignee'] && issue.fields['assignee']['accountId'];

      if (issueUserID && users.find(({accountId}) => accountId === issueUserID)) {
        allSprints.forEach((issueSprint, index) => {
          issue.changelog.histories.forEach(changes => {
            const created = new Date(changes.created);

            if (new Date(issueSprint.completeDate || new Date().toString()) >= created) {
              changes.items.forEach(change => {
                if (change.field.toLowerCase() === 'timeoriginalestimate') {
                  time = Number(change.to || 0) / 3600;
                }
              });
            }
          });

          if (index === allSprints.length - 1 && isFinished) {
            timeAggregator.get(issueSprint.id.toString()).fact += time;
          }
        });
      }
    });

    sprints.forEach(sprint => {
      plan.series.push({
        name: sprint.name,
        value: Number(timeAggregator.get(sprint.id.toString()).plan.toFixed())
      });
      fact.series.push({
        name: sprint.name,
        value: Number(timeAggregator.get(sprint.id.toString()).fact.toFixed())
      });
    });

    return [
      plan,
      fact
    ];
  }
}
