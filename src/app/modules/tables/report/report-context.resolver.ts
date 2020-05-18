import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IReportContext } from './interfaces/report-context.interfaces';
import { LifecycleReportContext } from './contexts/lifecycle-report.context';
import { HttpClient } from '@angular/common/http';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { FormBuilder } from '@ng-stack/forms';
import { DynamicReportContext } from './contexts/dynamic-report.context';
import { TimeSpentReportContext } from './contexts/time-spent-report.context';
import { IssueSearchService } from '@core/api/platform/api/issueSearch.service';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { BoardsService } from '@core/api/software/api/boards.service';
import { WorkflowStatusesService } from '@core/api/platform/api/workflowStatuses.service';
import { GroupsService } from '@core/api/platform/api/groups.service';

@Injectable({
  providedIn: 'root'
})
export class ReportContextResolver implements Resolve<IReportContext> {
  constructor(private readonly http: HttpClient,
              private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly issueSearchService: IssueSearchService,
              private readonly sprintsService: SprintsService,
              private readonly boardsService: BoardsService,
              private readonly groupsService: GroupsService,
              private readonly workflowStatusesService: WorkflowStatusesService,
              @Inject(LOCALE_ID) public locale: string) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IReportContext {
    const reportID = route.params.reportID;

    if (reportID === TableID.LIFECYCLE) {
      return new LifecycleReportContext(this.issueSearchService, this.sprintsService, this.fb, this.locale);
    } else if (reportID === TableID.DYNAMIC) {
      return new DynamicReportContext(
        this.boardsService,
        this.workflowStatusesService,
        this.sprintsService,
        this.issueSearchService,
        this.fb,
        this.locale
      );
    } else if (reportID === TableID.TIME_SPENT) {
      return new TimeSpentReportContext(
        this.boardsService,
        this.workflowStatusesService,
        this.sprintsService,
        this.issueSearchService,
        this.groupsService,
        this.fb,
        this.locale
      );
    }

    this.router.navigate(['/']);

    return undefined;
  }
}
