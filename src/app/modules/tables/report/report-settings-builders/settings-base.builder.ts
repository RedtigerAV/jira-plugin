import { FormGroup } from '@ng-stack/forms';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

export class SettingsBaseBuilder {
  protected destroy$ = new Subject<void>();

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected initCommonSubscribes(form: FormGroup<ISettingsPanelForm>): void {
    form.controls.project.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        form.controls.board.reset();
        form.controls.boardPreview.reset();
      });

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
}
