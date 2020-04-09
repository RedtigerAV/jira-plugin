import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { TableID } from '@core/interfaces/table-main-info.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportDefaultSettingsService {
  private defaultSettingsMap = new Map<TableID, IReportSettings>();

  public getReportDefaultSettings(tableID: TableID): Observable<IReportSettings> {
    return of(this.defaultSettingsMap.get(tableID));
  }

  public setReportDefaultSettings(tableID: TableID, settings: IReportSettings): Observable<IReportSettings> {
    this.defaultSettingsMap.set(tableID, settings);

    return of(this.defaultSettingsMap.get(tableID));
  }
}
