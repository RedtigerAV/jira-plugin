import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { IReportContext } from './interfaces/report-context.interfaces';
import { ActivatedRoute } from '@angular/router';
import { DefaultSettingsMiddleware } from '@core/services/default-settings.middleware';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DefaultSettingsMiddleware]
})
export class ReportComponent implements OnInit, OnDestroy {
  public readonly context: IReportContext;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly defaultSettingsMiddleware: DefaultSettingsMiddleware) {
    this.context = this.activatedRoute.snapshot.data.context;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.context.destroy();
  }

  public onSettings(): void {
    this.defaultSettingsMiddleware.openSettingsModalHandler(this.context.tableID, this.context.settingsBuilder);
  }
}
