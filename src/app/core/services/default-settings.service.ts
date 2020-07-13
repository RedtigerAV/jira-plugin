import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { StructureID } from '@core/interfaces/structure.interfaces';
import { AppPropertiesService } from '@core/api/platform/api/appProperties.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultSettingsService {
  private readonly prefix = 'defaultSettings';

  constructor(private readonly appPropertiesService: AppPropertiesService) {}

  //ToDo: разобраться, почему не работает при перехвате ошибки
  public getDefaultSettings(structureID: StructureID): Observable<ISettingsPanelForm> {
    return this.appPropertiesService.getAddonProperties(environment.addonKey)
      .pipe(
        switchMap(({keys}) => {
          const currentKey = this.getPropertyKey(structureID);
          const isPropertyExist = keys.some(({key}) => key === currentKey);

          return isPropertyExist
            ? this.appPropertiesService.getAddonProperty(environment.addonKey, currentKey)
            : of({value: null});
        }),
        catchError(() => of({value: null})),
        map(({value}) => value),
        map((reportSettings: ISettingsPanelForm) => {
          if (reportSettings && reportSettings.startDate) {
            (reportSettings.startDate as Date) = new Date(reportSettings.startDate);
          }

          if (reportSettings && reportSettings.endDate) {
            (reportSettings.endDate as Date) = new Date(reportSettings.endDate);
          }

          return reportSettings;
        })
      );
  }

  public setDefaultSettings(structureID: StructureID, settings: ISettingsPanelForm): Observable<ISettingsPanelForm> {
    return this.appPropertiesService.putAddonProperty(environment.addonKey, this.getPropertyKey(structureID), settings)
      .pipe(
        map(() => settings),
        catchError(() => of(null))
      );
  }

  private getPropertyKey(structureID: StructureID): string {
    return `${this.prefix}-${structureID}`;
  }
}
