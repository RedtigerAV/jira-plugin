import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { IReportContext } from './interfaces/report-context.interfaces';
import { ActivatedRoute } from '@angular/router';
import { DefaultSettingsService } from '@core/services/default-settings.service';
import { switchMap, take } from 'rxjs/operators';
import { SettingsPanelModalComponent } from '../../shared/settings-panel/settings-panel-modal/settings-panel-modal.component';
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
              private readonly reportDefaultSettingsService: DefaultSettingsService) {
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
          const dialogRef = this.dialog.open(SettingsPanelModalComponent, {
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
