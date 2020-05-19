import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { of } from 'rxjs';
import { SettingsPanelPeriodTypesEnum } from '@core/interfaces/settings-panel-form.interfaces';

interface IPeriodTypeDataSourceOption {
  id: SettingsPanelPeriodTypesEnum;
  name: string;
}

export const periodTypeDataSource: IPeriodTypeDataSourceOption[] = [
  { id: SettingsPanelPeriodTypesEnum.DATE, name: 'Date' },
  { id: SettingsPanelPeriodTypesEnum.SPRINT, name: 'Sprint' }
];

export class PeriodTypeDataSource implements ISelectDataSource {
  public data$ = of(<IPeriodTypeDataSourceOption[]>(periodTypeDataSource));

  public getValue(option: IPeriodTypeDataSourceOption): string {
    return option && option.id;
  }

  public getOptionByValue(value: string): IPeriodTypeDataSourceOption {
    return periodTypeDataSource.find(option => this.getValue(option) === value);
  }

  public displayWith(option: IPeriodTypeDataSourceOption): string {
    return option && option.name;
  }
}
