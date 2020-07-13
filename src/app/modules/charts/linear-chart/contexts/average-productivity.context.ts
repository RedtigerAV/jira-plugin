import { ILinearChartContext } from './context.interface';
import { ChartID } from '@core/interfaces/structure.interfaces';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { Observable } from 'rxjs';
import { ILinearChartData } from '../../interfaces/chart-data.interfaces';
import { map, switchMap } from 'rxjs/operators';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { IssueBeanModel } from '@core/api/platform/model/issueBean';
import { Sprint } from '@core/api/software/model/sprint';
import { getCurrentSprint } from '@core/helpers/issues.helpers';
import { AverageProductivitySettingsBuilder } from '../settings-builders/average-productivity-settings.builder';
import { FormBuilder } from '@ng-stack/forms';
import { UserPickerUserModel } from '@core/api/platform/model/userPickerUser';

export class AverageProductivityContext implements ILinearChartContext {
  public chartID = ChartID.AVERAGE_PRODUCTIVITY;
  public title = 'Средняя производительность';
  public xAxisLabel = 'Спринты';
  public yAxisLabel = 'Часы';
  public settingsBuilder = new AverageProductivitySettingsBuilder(this.fb);

  constructor(
    public sprintsService: SprintsService,
    public issueSearchService: IssueSearchService,
    public fb: FormBuilder
  ){}

  public getData(settings: ISettingsPanelForm): Observable<ILinearChartData[]> {
    const projectID = settings.project.id;
    const boardID = settings.board.id.toString(10);
    const users = settings.users || [];

    return this.sprintsService.searchSprints(boardID, 'closed,active')
      .pipe(
        map(({values}) => values),
        switchMap(sprints => {
          const jql = [
            `project=${projectID}`,
            `sprint in (${sprints.map(({id}) => id).join(',')})`
          ]
            .join(' AND ');

          return this.issueSearchService
            .searchForIssuesUsingJql(jql, undefined, 1000, undefined, undefined, 'changelog')
            .pipe(
              map(issues => this.transformData(issues.issues, sprints, users as UserPickerUserModel[]))
            )
        })
      );
  }

  public destroy(): void {
    this.settingsBuilder.destroy();
  }

  private transformData(issues: IssueBeanModel[], sprints: Sprint[], users: UserPickerUserModel[]): ILinearChartData[] {
    const usersGroupIds = new Set(users.map(({accountId}) => accountId));
    const tracked: ILinearChartData = {
      name: 'По затраченному времени',
      series: []
    };
    const done: ILinearChartData = {
      name: 'По первоначальной оценке задач',
      series: []
    };
    sprints.forEach(sprint => {
      let trackedTime = 0;
      let doneTime = 0;
      const activeUsersInSprint = new Set([]);

      issues.forEach(issue => {
        const issueSprint = getCurrentSprint(issue);
        const statusCategory = issue.fields['status']['statusCategory']['key'];
        const assignee = issue.fields['assignee'] && issue.fields['assignee']['accountId'];

        if (statusCategory === 'done' && issueSprint.id === sprint.id && assignee && usersGroupIds.has(assignee)) {
          doneTime += Number(issue.fields['timeoriginalestimate']) || 0;
          activeUsersInSprint.add(assignee);
        }

        issue.changelog.histories.forEach(changes => {
          const author = changes.author.accountId;
          const created = changes.created;

          if (
            new Date(created) >= new Date(sprint.startDate)
            && new Date(created) <= new Date(sprint.completeDate || sprint.endDate)
            && usersGroupIds.has(author)
          ) {
            changes.items.forEach(change => {
              if (change.field.toLowerCase() === 'timespent') {
                trackedTime += (Number(change.to) - Number(change.from || 0));
                activeUsersInSprint.add(author);
              }
            });
          }
        });
      });

      const activeUsersLength = Array.from(activeUsersInSprint).length;

      if (activeUsersLength > 0) {
        tracked.series.push({
          name: sprint.name,
          value: Number(((trackedTime / activeUsersLength) / 3600).toFixed(2))
        });

        done.series.push({
          name: sprint.name,
          value: Number(((doneTime / activeUsersLength) / 3600).toFixed(2))
        });
      }
    });

    return [
      tracked,
      done
    ]
  }
}
