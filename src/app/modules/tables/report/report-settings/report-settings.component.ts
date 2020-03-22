import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IReportSettings, IReportSettingsComponent } from '../interfaces/report-settings.interfaces';
import { FormGroup } from '@ng-stack/forms';
import { ReportMediator } from '../report.mediator';

@Component({
  selector: 'app-report-settings',
  templateUrl: './report-settings.component.html',
  styleUrls: ['./report-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportSettingsComponent implements OnInit, IReportSettingsComponent {
  form: FormGroup<IReportSettings>;

  constructor(private readonly mediator: ReportMediator) {
    mediator.reportSettingsComponent = this;
  }

  ngOnInit() {
  }

  applyDefaultSettings(): void {
  }

  saveSettingsAsDefault(): void {
  }
}
