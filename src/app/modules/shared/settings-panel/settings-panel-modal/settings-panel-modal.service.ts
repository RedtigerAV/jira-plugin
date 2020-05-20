import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { StructureID } from '@core/interfaces/structure.interfaces';
import { ISettingsPanelFormBuilder } from '@core/interfaces/settings-panel-form-builder.interfaces';
import { switchMap, take } from 'rxjs/operators';
import { SettingsPanelModalComponent } from './settings-panel-modal.component';
import { MatDialog } from '@angular/material';
import { DefaultSettingsService } from '@core/services/default-settings.service';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';

@Injectable()
export class SettingsPanelModalService {
  constructor(private readonly dialog: MatDialog,
              private readonly defaultSettingsService: DefaultSettingsService) {}

  public openDefaultSettingsPanelModel(
    structureID: StructureID,
    settingsBuilder: ISettingsPanelFormBuilder
  ): Observable<ISettingsPanelForm> {
    return this.defaultSettingsService.getDefaultSettings(structureID)
      .pipe(
        switchMap(settings => {
          const dialogRef = this.dialog.open(SettingsPanelModalComponent, {
            data: {
              title: `Настройки по умолчанию`,
              settings,
              settingsBuilder
            }
          });

          return dialogRef.afterClosed().pipe(take(1))
        }),
        switchMap(defaultSettings =>
          defaultSettings
            ? this.defaultSettingsService.setDefaultSettings(structureID, defaultSettings)
            : EMPTY
        )
      );
  }
}
