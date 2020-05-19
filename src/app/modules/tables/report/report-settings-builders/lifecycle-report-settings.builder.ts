import { ISettingsPanelFormBuilder } from '@core/interfaces/settings-panel-form-builder.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { ISettingsPanelForm, SettingsPanelPeriodTypesEnum } from '@core/interfaces/settings-panel-form.interfaces';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { Validators } from '@angular/forms';
import { SettingsBaseBuilder } from './settings-base.builder';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

export class LifecycleReportSettingsBuilder extends SettingsBaseBuilder implements ISettingsPanelFormBuilder {
  hiddenControls: BooleanFormState<ISettingsPanelForm> = {
    group: true,
    groupPreview: true
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
        periodBy: [model.periodBy],
        fromSprint: [model.fromSprint],
        fromSprintPreview: [model.fromSprintPreview],
        toSprint: [model.toSprint],
        toSprintPreview: [model.toSprintPreview],
        startDate: [model.startDate],
        endDate: [model.endDate]
      });
    } else {
      form = this.fb.group<ISettingsPanelForm>({
        project: ['', Validators.required],
        projectPreview: [],
        board: ['', Validators.required],
        boardPreview: [],
        periodBy: [SettingsPanelPeriodTypesEnum.DATE],
        fromSprint: [''],
        fromSprintPreview: [],
        toSprint: [''],
        toSprintPreview: [],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      });
    }

    this.initCommonSubscribes(form);
    this.initCustomSubscribes(form);

    return form;
  }

  private initCustomSubscribes(form): void {
    form.controls.periodBy.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        if (value === SettingsPanelPeriodTypesEnum.DATE) {
          form.controls.fromSprint.clearValidators();
          form.controls.toSprint.clearValidators();
          form.controls.startDate.setValidators(Validators.required);
          form.controls.endDate.setValidators(Validators.required);
        } else {
          form.controls.fromSprint.setValidators(Validators.required);
          form.controls.toSprint.setValidators(Validators.required);
          form.controls.startDate.clearValidators();
          form.controls.endDate.clearValidators();
        }
      });
  }
}
