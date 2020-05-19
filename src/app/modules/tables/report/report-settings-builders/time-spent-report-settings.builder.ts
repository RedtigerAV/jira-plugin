import { ISettingsPanelFormBuilder } from '@core/interfaces/settings-panel-form-builder.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { ISettingsPanelForm, SettingsPanelPeriodTypesEnum } from '@core/interfaces/settings-panel-form.interfaces';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { Validators } from '@angular/forms';
import { SettingsBaseBuilder } from './settings-base.builder';

export class TimeSpentReportSettingsBuilder extends SettingsBaseBuilder implements ISettingsPanelFormBuilder {
  hiddenControls: BooleanFormState<ISettingsPanelForm> = {
    periodBy: true,
    startDate: true,
    endDate: true
  };

  constructor(public fb: FormBuilder) {
    super();
  }

  getSettingsFromGroup(model?: ISettingsPanelForm): FormGroup<ISettingsPanelForm> {
    let form;

    if (model) {
      form = this.fb.group<ISettingsPanelForm>({
        project: [model.project, Validators.required],
        projectPreview: [model.projectPreview],
        board: [model.board, Validators.required],
        boardPreview: [model.boardPreview],
        group: [model.group, Validators.required],
        groupPreview: [model.groupPreview],
        periodBy: [SettingsPanelPeriodTypesEnum.SPRINT],
        fromSprint: [model.fromSprint, Validators.required],
        fromSprintPreview: [model.fromSprintPreview],
        toSprint: [model.toSprint, Validators.required],
        toSprintPreview: [model.toSprintPreview]
      });
    } else {
      form = this.fb.group<ISettingsPanelForm>({
        project: ['', Validators.required],
        projectPreview: [],
        board: ['', Validators.required],
        boardPreview: [],
        group: ['', Validators.required],
        groupPreview: [],
        periodBy: [SettingsPanelPeriodTypesEnum.SPRINT],
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
