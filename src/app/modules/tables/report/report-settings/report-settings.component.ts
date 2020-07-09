import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IReportSettingsComponent } from '../interfaces/report-settings.interfaces';
import { FormGroup } from '@ng-stack/forms';
import { ReportMediator } from '../report.mediator';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { DefaultSettingsService } from '@core/services/default-settings.service';
import { IReportContext } from '../interfaces/report-context.interfaces';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { DefaultSettingsMiddleware } from '@core/services/default-settings.middleware';

@Component({
  selector: 'app-report-settings',
  templateUrl: './report-settings.component.html',
  styleUrls: ['./report-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DefaultSettingsMiddleware]
})
export class ReportSettingsComponent implements OnInit, OnDestroy, IReportSettingsComponent {
  @Input() context: IReportContext;

  form: FormGroup<ISettingsPanelForm>;

  constructor(private readonly mediator: ReportMediator,
              private readonly cdr: ChangeDetectorRef,
              private readonly defaultSettingsMiddleware: DefaultSettingsMiddleware,
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
    this.defaultSettingsMiddleware.applyDefaultSettings(this.context.tableID, this.form, this.cdr);
  }

  saveSettingsAsDefault(): void {
    this.defaultSettingsMiddleware.saveSettingsAsDefault(this.context.tableID, this.form);
  }
}
