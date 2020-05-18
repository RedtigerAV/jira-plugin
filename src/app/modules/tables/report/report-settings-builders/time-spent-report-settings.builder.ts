import { IReportSettingsBuilder } from '@core/interfaces/report-settings-builder.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { IReportSettings, ReportPeriodTypesEnum } from '@core/interfaces/report-settings.interfaces';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { Validators } from '@angular/forms';
import { SettingsBaseBuilder } from './settings-base.builder';

export class TimeSpentReportSettingsBuilder extends SettingsBaseBuilder implements IReportSettingsBuilder {
  hiddenControls: BooleanFormState<IReportSettings> = {
    periodBy: true,
    startDate: true,
    endDate: true
  };

  constructor(public fb: FormBuilder) {
    super();
  }

  getSettingsFromGroup(model?: IReportSettings): FormGroup<IReportSettings> {
    let form;

    if (model) {
      form = this.fb.group<IReportSettings>({
        project: [model.project, Validators.required],
        projectPreview: [model.projectPreview],
        board: [model.board, Validators.required],
        boardPreview: [model.boardPreview],
        group: [model.group, Validators.required],
        groupPreview: [model.groupPreview],
        periodBy: [ReportPeriodTypesEnum.SPRINT],
        fromSprint: [model.fromSprint, Validators.required],
        fromSprintPreview: [model.fromSprintPreview],
        toSprint: [model.toSprint, Validators.required],
        toSprintPreview: [model.toSprintPreview]
      });
    } else {
      form = this.fb.group<IReportSettings>({
        project: ['', Validators.required],
        projectPreview: [],
        board: ['', Validators.required],
        boardPreview: [],
        group: ['', Validators.required],
        groupPreview: [],
        periodBy: [ReportPeriodTypesEnum.SPRINT],
        fromSprint: ['', Validators.required],
        fromSprintPreview: [],
        toSprint: ['', Validators.required],
        toSprintPreview: []
      });
    }

    this.initCommonSubscribes(form);

    return form;
  }
}
