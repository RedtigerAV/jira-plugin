import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { IReportContext } from './interfaces/report-context.interfaces';
import { ActivatedRoute } from '@angular/router';
import { ReportDefaultSettingsService } from '@core/services/report-default-settings.service';
import { switchMap, take } from 'rxjs/operators';
import { TableSettingsModalComponent } from '../../shared/table-settings/table-settings-modal/table-settings-modal.component';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { MatDialog } from '@angular/material';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements OnInit, OnDestroy {
  public readonly context: IReportContext;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly dialog: MatDialog,
              private readonly reportDefaultSettingsService: ReportDefaultSettingsService) {
    this.context = this.activatedRoute.snapshot.data.context;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.context.destroy();
  }

  public onSettings(): void {
    this.reportDefaultSettingsService.getReportDefaultSettings(this.context.tableID)
      .pipe(
        switchMap(settings => {
          const settingsBuilder = this.context.settingsBuilder;
          const dialogRef = this.dialog.open(TableSettingsModalComponent, {
            data: {
              title: `Default settings for ${this.context.title}`,
              settings,
              settingsBuilder
            }
          });

          return dialogRef.afterClosed().pipe(take(1))
        }),
        switchMap(defaultSettings =>
          defaultSettings
            ? this.reportDefaultSettingsService.setReportDefaultSettings(this.context.tableID, defaultSettings)
            : EMPTY
        ),
        takeUntilDestroyed(this)
      )
      .subscribe();
  }
}
