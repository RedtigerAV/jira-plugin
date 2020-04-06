import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IReportSettingsComponent } from '../interfaces/report-settings.interfaces';
import { FormGroup } from '@ng-stack/forms';
import { ReportMediator } from '../report.mediator';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { ReportDefaultSettingsService } from '@core/services/report-default-settings.service';
import { IReportContext } from '../interfaces/report-context.interfaces';

@Component({
  selector: 'app-report-settings',
  templateUrl: './report-settings.component.html',
  styleUrls: ['./report-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportSettingsComponent implements OnInit, IReportSettingsComponent {
  @Input() context: IReportContext;

  form: FormGroup<IReportSettings>;

  constructor(private readonly mediator: ReportMediator,
              private readonly reportDefaultSettingsService: ReportDefaultSettingsService) {
    mediator.reportSettingsComponent = this;
  }

  ngOnInit() {
    this.form = this.context.settingsBuilder.getSettingsFromGroup();
  }

  applyDefaultSettings(): void {
    this.reportDefaultSettingsService.getReportDefaultSettings(this.context.tableID);
  }

  saveSettingsAsDefault(): void {
    this.reportDefaultSettingsService.setReportDefaultSettings(this.context.tableID, this.form.getRawValue());
  }
}
