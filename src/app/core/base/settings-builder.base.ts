import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { ISettingsPanelForm, SettingsPanelPeriodTypesEnum } from '@core/interfaces/settings-panel-form.interfaces';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { IFormBuilderConfig } from '@core/interfaces/form-builder-config.interface';
import { StringKeys } from '@core/interfaces/string-keys.interface';
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

  public getSettingsFromGroup(model?: ISettingsPanelForm): FormGroup<ISettingsPanelForm> {
    const fbConfig: IFormBuilderConfig<ISettingsPanelForm> = {};
    const periodFormType: PeriodFormTypes = this.getPeriodFormType();

    this.setPeriodByControl(fbConfig, model, periodFormType);
    this.setControls(fbConfig, model);

    const form = this.fb.group<ISettingsPanelForm>(fbConfig);

    this.initValueChangeHandlers(form);

    return form;
  }

  private setPeriodByControl(
    fbConfig: IFormBuilderConfig<ISettingsPanelForm>,
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

  private setControls(fbConfig: IFormBuilderConfig<ISettingsPanelForm>, model: ISettingsPanelForm): void {
    Object.entries(this.displayedControls)
      .filter(([, value]) => !!value)
      .forEach(([key, value]: [StringKeys<ISettingsPanelForm>, boolean]) => {
        switch (key) {
          case 'project':
            fbConfig.project = [(model && model.project) || '', Validators.required];
            break;
          case 'projectPreview':
            fbConfig.projectPreview = [model && model.projectPreview];
            break;
          case 'board':
            fbConfig.board = [(model && model.board) || '', Validators.required];
            break;
          case 'boardPreview':
            fbConfig.boardPreview = [model && model.projectPreview];
            break;
          case 'group':
            fbConfig.group = [(model && model.group) || '', Validators.required];
            break;
          case 'groupPreview':
            fbConfig.groupPreview = [model && model.groupPreview];
            break;
          case 'startDate':
            fbConfig.startDate = [
              (model && model.startDate) || '',
              fbConfig.periodBy[0] === SettingsPanelPeriodTypesEnum.DATE
                ? Validators.required
                : undefined
            ];
            break;
          case 'endDate':
            fbConfig.endDate = [
              (model && model.endDate) || '',
              fbConfig.periodBy[0] === SettingsPanelPeriodTypesEnum.DATE
                ? Validators.required
                : undefined
            ];
            break;
          case 'fromSprint':
            fbConfig.fromSprint = [
              (model && model.fromSprint) || '',
              fbConfig.periodBy[0] === SettingsPanelPeriodTypesEnum.SPRINT
                ? Validators.required
                : undefined
            ];
            break;
          case 'fromSprintPreview':
            fbConfig.fromSprintPreview = [model && model.fromSprintPreview];
            break;
          case 'toSprint':
            fbConfig.toSprint = [
              (model && model.toSprint) || '',
              fbConfig.periodBy[0] === SettingsPanelPeriodTypesEnum.SPRINT
                ? Validators.required
                : undefined
            ];
            break;
          case 'toSprintPreview':
            fbConfig.toSprintPreview = [model && model.toSprintPreview];
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
        form.controls.boardPreview.reset();
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
        form.controls.fromSprintPreview.reset();

        form.controls.toSprint.reset();
        form.controls.toSprintPreview.reset();
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
