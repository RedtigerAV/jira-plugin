import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IReportContext } from './interfaces/report-context.interfaces';
import { LifecycleReportContext } from './contexts/lifecycle-report.context';
import { HttpClient } from '@angular/common/http';
import { TableID } from '@core/interfaces/table-main-info.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportContextResolver implements Resolve<IReportContext> {
  constructor(private readonly http: HttpClient,
              private readonly router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IReportContext {
    const reportID = route.params.reportID;

    if (reportID === TableID.LIFECYCLE) {
      return new LifecycleReportContext(this.http);
    }

    this.router.navigate(['/']);

    return undefined;
  }
}
