import { ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import { StructureID } from '@core/interfaces/structure.interfaces';
import { ISettingsPanelFormBuilder } from '@core/interfaces/settings-panel-form-builder.interfaces';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { TgSnackbarSuccess } from '@shared/components/tg-snackbar/models/tg-snackbar.models';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';

// ToDo: подумать над структурой, и, возможно, вынести сервис в modules/shared
import { SettingsPanelModalService } from '../../modules/shared/settings-panel/settings-panel-modal/settings-panel-modal.service';
import { DefaultSettingsService } from '@core/services/default-settings.service';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { FormGroup } from '@ng-stack/forms';
import { take } from 'rxjs/operators';

@Injectable()
export class DefaultSettingsMiddleware implements OnDestroy {
  constructor(private readonly settingsPanelModalService: SettingsPanelModalService,
              private readonly snackbar: TgSnackbarService,
              private readonly defaultSettingsService: DefaultSettingsService) {}

  public ngOnDestroy(): void {}

  public saveSettingsAsDefault(structureID: StructureID, form: FormGroup<ISettingsPanelForm>, text?: string): void {
    this.defaultSettingsService.setDefaultSettings(structureID, form.getRawValue())
      .pipe(take(1))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess(text ? text : 'Настройки по умолчанию сохранены!'))
      });
  }

  public applyDefaultSettings(structureID: StructureID, form: FormGroup<ISettingsPanelForm>, cdr: ChangeDetectorRef): void {
    this.defaultSettingsService.getDefaultSettings(structureID)
      .pipe(take(1))
      .subscribe((settings: ISettingsPanelForm) => {
        form.patchValue(settings);
        cdr.detectChanges();
      });
  }

  public openSettingsModalHandler(structureID: StructureID, settingsBuilder: ISettingsPanelFormBuilder, text?: string): void {
    this.settingsPanelModalService.openDefaultSettingsPanelModel(structureID, settingsBuilder)
      .pipe(take(1))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess(text ? text : 'Настройки по умолчанию сохранены!'))
      });
  }
}
