import { OnDestroy } from '@angular/core';
import { IReportSettingsBuilder } from '@core/interfaces/report-settings-builder.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { IReportSettings, ReportPeriodTypesEnum } from '@core/interfaces/report-settings.interfaces';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';

export class TimeSpentReportSettingsBuilder implements OnDestroy, IReportSettingsBuilder {
  hiddenControls: BooleanFormState<IReportSettings> = {
    userOrGroup: true,
    userOrGroupPreview: true,
    periodBy: true,
    startDate: true,
    endDate: true
  };

  constructor(public fb: FormBuilder) {
  }

  getSettingsFromGroup(model?: IReportSettings): FormGroup<IReportSettings> {
    let form;

    if (model) {
      form = this.fb.group<IReportSettings>({
        project: [model.project, Validators.required],
        projectPreview: [model.projectPreview],
        board: [model.board, Validators.required],
        boardPreview: [model.boardPreview],
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
        periodBy: [ReportPeriodTypesEnum.SPRINT],
        fromSprint: ['', Validators.required],
        fromSprintPreview: [],
        toSprint: ['', Validators.required],
        toSprintPreview: []
      });
    }

    this.initFormSubscriptions(form);

    return form;
  }

  private initFormSubscriptions(form: FormGroup<IReportSettings>): void {
    form.controls.project.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this)
      )
      .subscribe(() => {
        form.controls.board.reset();
        form.controls.boardPreview.reset();
      });

    form.controls.board.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this)
      )
      .subscribe(() => {
        form.controls.fromSprint.reset();
        form.controls.fromSprintPreview.reset();

        form.controls.toSprint.reset();
        form.controls.toSprintPreview.reset();
      });
  }

  ngOnDestroy(): void {
    // ToDo: сделать норм отписку
    console.log('Destroy LifecycleReportSettingsBuilder');
  }
}
