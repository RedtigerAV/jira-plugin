import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { IReportSettingsComponent } from '../interfaces/report-settings.interfaces';
import { FormGroup } from '@ng-stack/forms';
import { ReportMediator } from '../report.mediator';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { ReportDefaultSettingsService } from '@core/services/report-default-settings.service';
import { IReportContext } from '../interfaces/report-context.interfaces';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';
import { TgSnackbarSuccess } from '@shared/components/tg-snackbar/models/tg-snackbar.models';

@Component({
  selector: 'app-report-settings',
  templateUrl: './report-settings.component.html',
  styleUrls: ['./report-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportSettingsComponent implements OnInit, OnDestroy, IReportSettingsComponent {
  @Input() context: IReportContext;

  form: FormGroup<IReportSettings>;

  constructor(private readonly mediator: ReportMediator,
              private readonly snackbar: TgSnackbarService,
              private readonly reportDefaultSettingsService: ReportDefaultSettingsService) {
    mediator.reportSettingsComponent = this;
  }

  ngOnInit() {
    this.reportDefaultSettingsService.getReportDefaultSettings(this.context.tableID)
      .pipe(takeUntilDestroyed(this))
      .subscribe((settings: IReportSettings) => {
        this.form = this.context.settingsBuilder.getSettingsFromGroup(settings);
      });
  }

  ngOnDestroy(): void {}

  applyDefaultSettings(): void {
    this.reportDefaultSettingsService.getReportDefaultSettings(this.context.tableID)
      .pipe(takeUntilDestroyed(this))
      .subscribe((settings: IReportSettings) => {
        this.form.patchValue(settings);
      });
  }

  saveSettingsAsDefault(): void {
    this.reportDefaultSettingsService.setReportDefaultSettings(this.context.tableID, this.form.getRawValue())
      .pipe(takeUntilDestroyed(this))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess('Default settings saved!'))
      });
  }
}
