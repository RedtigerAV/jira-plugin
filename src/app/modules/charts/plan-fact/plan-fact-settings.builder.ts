import { ISettingsPanelFormBuilder } from '@core/interfaces/settings-panel-form-builder.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Validators } from '@angular/forms';

export class PlanFactSettingsBuilder implements ISettingsPanelFormBuilder {
  public hiddenControls: BooleanFormState<ISettingsPanelForm> = {
    periodBy: true,
    startDate: true,
    endDate: true,
    fromSprint: true,
    fromSprintPreview: true,
    toSprint: true,
    toSprintPreview: true
  };

  private destroy$ = new Subject<void>();

  constructor(public fb: FormBuilder) {}

  getSettingsFromGroup(model?: ISettingsPanelForm): FormGroup<ISettingsPanelForm> {
    let form;

    if (model) {
      form = this.fb.group<ISettingsPanelForm>({
        project: [model.project, Validators.required],
        projectPreview: [model.projectPreview],
        board: [model.board, Validators.required],
        boardPreview: [model.boardPreview],
        group: [model.group, Validators.required],
        groupPreview: [model.groupPreview]
      });
    } else {
      form = this.fb.group<ISettingsPanelForm>({
        project: ['', Validators.required],
        projectPreview: [],
        board: ['', Validators.required],
        boardPreview: [],
        group: ['', Validators.required],
        groupPreview: []
      });
    }

    this.initSubscriptions(form);

    return form;
  }

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initSubscriptions(form: FormGroup<ISettingsPanelForm>): void {
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
}
