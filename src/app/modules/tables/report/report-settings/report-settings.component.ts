import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IReportSettingsComponent } from '../interfaces/report-settings.interfaces';
import { FormGroup } from '@ng-stack/forms';
import { ReportMediator } from '../report.mediator';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { DefaultSettingsService } from '@core/services/default-settings.service';
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

  form: FormGroup<ISettingsPanelForm>;

  constructor(private readonly mediator: ReportMediator,
              private readonly snackbar: TgSnackbarService,
              private readonly cdr: ChangeDetectorRef,
              private readonly reportDefaultSettingsService: DefaultSettingsService) {
    mediator.reportSettingsComponent = this;
  }

  ngOnInit() {
    this.reportDefaultSettingsService.getDefaultSettings(this.context.tableID)
      .pipe(takeUntilDestroyed(this))
      .subscribe((settings: ISettingsPanelForm) => {
        this.form = this.context.settingsBuilder.getSettingsFromGroup(settings);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {}

  applyDefaultSettings(): void {
    this.reportDefaultSettingsService.getDefaultSettings(this.context.tableID)
      .pipe(takeUntilDestroyed(this))
      .subscribe((settings: ISettingsPanelForm) => {
        this.form.patchValue(settings);
        this.cdr.detectChanges();
      });
  }

  saveSettingsAsDefault(): void {
    this.reportDefaultSettingsService.setDefaultSettings(this.context.tableID, this.form.getRawValue())
      .pipe(takeUntilDestroyed(this))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess('Настройки по умолчанию сохранены!'))
      });
  }
}
