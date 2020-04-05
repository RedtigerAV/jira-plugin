import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { TableID } from '@core/interfaces/table-main-info.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportDefaultSettingsService {
  public getReportDefaultSettings(tableID: TableID): Observable<IReportSettings> {
    return undefined;
  }

  public setReportDefaultSettings(tableID: TableID, settings: IReportSettings): Observable<IReportSettings> {
    return undefined;
  }
}
