import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { StructureID } from '@core/interfaces/structure.interfaces';
import { AppPropertiesService } from '@core/api/platform/api/appProperties.service';
import { addonKey } from '@core/common-configuration/global';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportDefaultSettingsService {
  private readonly prefix = 'defaultSettings';

  constructor(private readonly appPropertiesService: AppPropertiesService) {}

  //ToDo: разобраться, почему не работает при перехвате ошибки
  public getReportDefaultSettings(structureID: StructureID): Observable<IReportSettings> {
    return this.appPropertiesService.getAddonProperties(addonKey)
      .pipe(
        switchMap(({keys}) => {
          const currentKey = this.getPropertyKey(structureID);
          const isPropertyExist = keys.some(({key}) => key === currentKey);

          return isPropertyExist
            ? this.appPropertiesService.getAddonProperty(addonKey, currentKey)
            : of({value: null});
        }),
        catchError(() => of({value: null})),
        map(({value}) => value),
        map((reportSettings: IReportSettings) => {
          if (reportSettings && reportSettings.startDate) {
            reportSettings.startDate = new Date(reportSettings.startDate);
          }

          if (reportSettings && reportSettings.endDate) {
            reportSettings.endDate = new Date(reportSettings.endDate);
          }

          return reportSettings;
        })
      );
  }

  public setReportDefaultSettings(structureID: StructureID, settings: IReportSettings): Observable<IReportSettings> {
    return this.appPropertiesService.putAddonProperty(addonKey, this.getPropertyKey(structureID), settings)
      .pipe(
        map(() => settings),
        catchError(() => of(null))
      );
  }

  private getPropertyKey(structureID: StructureID): string {
    return `${this.prefix}-${structureID}`;
  }
}
