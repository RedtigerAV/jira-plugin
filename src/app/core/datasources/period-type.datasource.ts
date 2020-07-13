import { Observable, of } from 'rxjs';
import { SettingsPanelPeriodTypesEnum } from '@core/interfaces/settings-panel-form.interfaces';
import { DataSourceBase } from '@core/datasources/datasource.base';

interface IPeriodTypeDataSourceOption {
  id: SettingsPanelPeriodTypesEnum;
  name: string;
}

export const periodTypeDataSource: IPeriodTypeDataSourceOption[] = [
  { id: SettingsPanelPeriodTypesEnum.DATE, name: 'Date' },
  { id: SettingsPanelPeriodTypesEnum.SPRINT, name: 'Sprint' }
];

export class PeriodTypeDataSource extends DataSourceBase<IPeriodTypeDataSourceOption, void> {
  constructor() {
    super();
  }

  public getKey(option: IPeriodTypeDataSourceOption): string {
    return option && option.id;
  }

  public displayWith(option: IPeriodTypeDataSourceOption): string {
    return option && option.name;
  }

  protected getData(filter: void): Observable<IPeriodTypeDataSourceOption[]> {
    return of(<IPeriodTypeDataSourceOption[]>(periodTypeDataSource));
  }
}
