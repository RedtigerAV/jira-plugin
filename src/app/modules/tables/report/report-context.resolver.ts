import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IReportContext } from './interfaces/report-context.interfaces';
import { LifecycleReportContext } from './contexts/lifecycle-report.context';
import { HttpClient } from '@angular/common/http';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { FormBuilder } from '@ng-stack/forms';
import { DatePipe } from '@angular/common';
import { DynamicReportContext } from './contexts/dynamic-report.context';
import { TimeSpentReportContext } from './contexts/time-spent-report.context';

@Injectable({
  providedIn: 'root'
})
export class ReportContextResolver implements Resolve<IReportContext> {
  constructor(private readonly http: HttpClient,
              private readonly router: Router,
              private readonly fb: FormBuilder,
              @Inject(LOCALE_ID) public locale: string) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IReportContext {
    const reportID = route.params.reportID;

    if (reportID === TableID.LIFECYCLE) {
      return new LifecycleReportContext(this.http, this.fb, this.locale);
    } else if (reportID === TableID.DYNAMIC) {
      return new DynamicReportContext(this.http, this.fb, this.locale);
    } else if (reportID === TableID.TIME_SPENT) {
      return new TimeSpentReportContext(this.http, this.fb, this.locale);
    }

    this.router.navigate(['/']);

    return undefined;
  }
}
