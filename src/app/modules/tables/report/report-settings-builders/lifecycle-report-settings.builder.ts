import { IReportSettingsBuilder } from '@core/interfaces/report-settings-builder.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { IReportSettings, ReportPeriodTypesEnum } from '@core/interfaces/report-settings.interfaces';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { Validators } from '@angular/forms';
import { SettingsBaseBuilder } from './settings-base.builder';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

export class LifecycleReportSettingsBuilder extends SettingsBaseBuilder implements IReportSettingsBuilder {
  hiddenControls: BooleanFormState<IReportSettings> = {
    group: true,
    groupPreview: true
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
        periodBy: [model.periodBy],
        fromSprint: [model.fromSprint],
        fromSprintPreview: [model.fromSprintPreview],
        toSprint: [model.toSprint],
        toSprintPreview: [model.toSprintPreview],
        startDate: [model.startDate],
        endDate: [model.endDate]
      });
    } else {
      form = this.fb.group<IReportSettings>({
        project: ['', Validators.required],
        projectPreview: [],
        board: ['', Validators.required],
        boardPreview: [],
        periodBy: [ReportPeriodTypesEnum.DATE],
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
        if (value === ReportPeriodTypesEnum.DATE) {
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
