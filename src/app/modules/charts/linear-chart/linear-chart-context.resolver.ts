import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ILinearChartContext } from './contexts/context.interface';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ChartID } from '@core/interfaces/structure.interfaces';
import { AverageProductivityContext } from './contexts/average-productivity.context';
import { FormBuilder } from '@ng-stack/forms';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { PlanningStorageService } from '@core/services/planning-storage.service';
import { PlanFactContext } from './contexts/plan-fact.context';
import { UnfinishedWorkContext } from './contexts/unfinished-work.context';
import { BugsWeightContext } from './contexts/bugs-weight.context';
import { DatePipe } from '@angular/common';
import { IssuePrioritiesService } from '@core/api/platform/api/issuePriorities.service';
import { BoardsService } from '@core/api/software/api/boards.service';
import { WorkflowStatusesService } from '@core/api/platform/api/workflowStatuses.service';

@Injectable({
  providedIn: 'root'
})
export class LinearChartContextResolver implements Resolve<ILinearChartContext> {
  private datePipe: DatePipe;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly issueSearchService: IssueSearchService,
              private readonly sprintsService: SprintsService,
              private readonly planningStorage: PlanningStorageService,
              private readonly issuePrioritiesService: IssuePrioritiesService,
              private readonly boardsService: BoardsService,
              private readonly workflowStatusesService: WorkflowStatusesService,
              @Inject(LOCALE_ID) locale: string) {
    this.datePipe = new DatePipe(locale);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  ILinearChartContext {
    const chartID = route.params.chartID;

    if (chartID === ChartID.AVERAGE_PRODUCTIVITY) {
      return new AverageProductivityContext(this.sprintsService, this.issueSearchService, this.fb);
    } else if (chartID === ChartID.PLAN_FACT) {
      return new PlanFactContext(this.sprintsService, this.issueSearchService, this.planningStorage, this.fb);
    } else if (chartID === ChartID.UNFINISHED_WORK) {
      return new UnfinishedWorkContext(this.sprintsService, this.issueSearchService, this.fb);
    } else if (chartID === ChartID.BUGS_WEIGHT) {
      return new BugsWeightContext(
        this.issueSearchService,
        this.issuePrioritiesService,
        this.boardsService,
        this.workflowStatusesService,
        this.datePipe,
        this.fb
      );
    }

    this.router.navigate(['/']);

    return undefined;
  }
}
