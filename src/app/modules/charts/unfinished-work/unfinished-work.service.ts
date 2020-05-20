import { Injectable } from '@angular/core';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { Observable, of } from 'rxjs';
import { IChartSeries } from '../interfaces/chart-data.interfaces';
import { delay, map, switchMap } from 'rxjs/operators';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { IssueBeanModel } from '@core/api/platform/model/issueBean';
import { Sprint } from '@core/api/software/model/sprint';
import { getAllSprints } from '@core/helpers/issues.helpers';

@Injectable()
export class UnfinishedWorkService {
  constructor(
    private readonly sprintsService: SprintsService,
    private readonly issueSearchService: IssueSearchService
  ){}

  public getData(settings: ISettingsPanelForm): Observable<IChartSeries[]> {
    const projectID = settings.project;
    const boardID = settings.board;

    return this.sprintsService.searchSprints(boardID, 'active,closed')
      .pipe(
        map(({values}) => values),
        switchMap(sprints => {
          const jql = [
            `project=${projectID}`,
            `sprint in (${sprints.map(({id}) => id).join(',')})`
          ]
            .join(' AND ');

          return this.issueSearchService.searchForIssuesUsingJql(jql, undefined, 1000, undefined, undefined, 'changelog')
            .pipe(
              map(issues => this.transformData(issues.issues, sprints))
            )
        })
      );
  }

  private transformData(issues: IssueBeanModel[], sprints: Sprint[]): IChartSeries[] {
    const result: IChartSeries[] = [];
    const timeAggregator = new Map<string, {unfinished: number, all: number}>();

    sprints.forEach(sprint => {
      timeAggregator.set(sprint.id.toString(), {unfinished: 0, all: 0});
    });

    issues.forEach(issue => {
      const allSprints = getAllSprints(issue);
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

    return result;
  }
}
