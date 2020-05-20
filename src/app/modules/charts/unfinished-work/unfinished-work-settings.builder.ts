import { ISettingsPanelFormBuilder } from '@core/interfaces/settings-panel-form-builder.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { Validators } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

export class UnfinishedWorkSettingsBuilder implements ISettingsPanelFormBuilder {
  public hiddenControls: BooleanFormState<ISettingsPanelForm> = {
    group: true,
    groupPreview: true,
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
        boardPreview: [model.boardPreview]
      });
    } else {
      form = this.fb.group<ISettingsPanelForm>({
        project: ['', Validators.required],
        projectPreview: [],
        board: ['', Validators.required],
        boardPreview: []
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
