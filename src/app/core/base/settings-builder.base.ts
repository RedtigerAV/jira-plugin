import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { ISettingsPanelForm, SettingsPanelPeriodTypesEnum } from '@core/interfaces/settings-panel-form.interfaces';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BooleanFormState, NgStackFormBuilderConfig, StringKeys } from '@shared/helpers/types.helper';
import { Validators } from '@angular/forms';
import { ISettingsPanelFormBuilder } from '@core/interfaces/settings-panel-form-builder.interfaces';

export enum PeriodFormTypes {
  DATE_ONLY = 'date_only',
  SPRINT_ONLY = 'sprint_only',
  DATE_AND_SPRINT = 'date_and_sprint'
}

export abstract class SettingsBuilderBase implements ISettingsPanelFormBuilder{
  public abstract displayedControls: BooleanFormState<ISettingsPanelForm>;
  protected destroy$ = new Subject<void>();

  protected constructor(protected fb: FormBuilder) {}

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getSettingsFormGroup(model?: ISettingsPanelForm): FormGroup<ISettingsPanelForm> {
    const fbConfig: NgStackFormBuilderConfig<ISettingsPanelForm> = {};
    const periodFormType: PeriodFormTypes = this.getPeriodFormType();

    this.setPeriodByControl(fbConfig, model, periodFormType);
    this.setControls(fbConfig, model);

    const form = this.fb.group<ISettingsPanelForm>(fbConfig);

    this.initValueChangeHandlers(form);

    return form;
  }

  private setPeriodByControl(
    fbConfig: NgStackFormBuilderConfig<ISettingsPanelForm>,
    model: ISettingsPanelForm,
    periodFormType: PeriodFormTypes
  ): void {
    if (model && model.periodBy) {
      fbConfig.periodBy = [model.periodBy];
    } else {
      switch (periodFormType) {
        case PeriodFormTypes.SPRINT_ONLY:
          fbConfig.periodBy = [SettingsPanelPeriodTypesEnum.SPRINT];
          break;
        case PeriodFormTypes.DATE_AND_SPRINT:
        case PeriodFormTypes.DATE_ONLY:
        default:
          fbConfig.periodBy = [SettingsPanelPeriodTypesEnum.DATE];
          break;
      }
    }
  }

  private setControls(fbConfig: NgStackFormBuilderConfig<ISettingsPanelForm>, model: ISettingsPanelForm): void {
    Object.entries(this.displayedControls)
      .filter(([, value]) => !!value)
      .forEach(([key, value]: [StringKeys<ISettingsPanelForm>, boolean]) => {
        switch (key) {
          case 'project':
            fbConfig.project = [model && model.project, Validators.required];
            break;
          case 'board':
            fbConfig.board = [model && model.board, Validators.required];
            break;
          case 'users':
            fbConfig.users = [model && model.users, Validators.required];
            break;
          case 'startDate':
            fbConfig.startDate = [
              model && model.startDate,
              fbConfig.periodBy[0] === SettingsPanelPeriodTypesEnum.DATE
                ? Validators.required
                : undefined
            ];
            break;
          case 'endDate':
            fbConfig.endDate = [
              model && model.endDate,
              fbConfig.periodBy[0] === SettingsPanelPeriodTypesEnum.DATE
                ? Validators.required
                : undefined
            ];
            break;
          case 'fromSprint':
            fbConfig.fromSprint = [
              model && model.fromSprint,
              fbConfig.periodBy[0] === SettingsPanelPeriodTypesEnum.SPRINT
                ? Validators.required
                : undefined
            ];
            break;
          case 'toSprint':
            fbConfig.toSprint = [
              model && model.toSprint,
              fbConfig.periodBy[0] === SettingsPanelPeriodTypesEnum.SPRINT
                ? Validators.required
                : undefined
            ];
            break;
        }
      });
  }

  private getPeriodFormType(): PeriodFormTypes {
    const periodByDate = this.displayedControls.startDate && this.displayedControls.endDate;
    const periodBySprint = this.displayedControls.fromSprint && this.displayedControls.toSprint;

    if (periodByDate && periodBySprint) {
      return PeriodFormTypes.DATE_AND_SPRINT;
    } else if (periodByDate) {
      return PeriodFormTypes.DATE_ONLY;
    } else if (periodBySprint) {
      return PeriodFormTypes.SPRINT_ONLY;
    }
  }

  private initValueChangeHandlers(form: FormGroup<ISettingsPanelForm>): void {
    if (form.controls.project && form.controls.board) {
      this.initProjectValueChangeHandler(form);
    }

    if (form.controls.board && form.controls.fromSprint && form.controls.toSprint) {
      this.initBoardValueChangeHandler(form);
    }

    if (form.controls.periodBy && form.controls.startDate && form.controls.endDate && form.controls.fromSprint && form.controls.toSprint) {
      this.initPeriodValueChangeHandler(form);
    }
  }

  private initProjectValueChangeHandler(form: FormGroup<ISettingsPanelForm>): void {
    form.controls.project.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        form.controls.board.reset();
      });
  }

  private initBoardValueChangeHandler(form: FormGroup<ISettingsPanelForm>): void {
    form.controls.board.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        form.controls.fromSprint.reset();
        form.controls.toSprint.reset();
      });
  }

  private initPeriodValueChangeHandler(form: FormGroup<ISettingsPanelForm>): void {
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
