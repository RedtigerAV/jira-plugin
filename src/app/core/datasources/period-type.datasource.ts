import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { of } from 'rxjs';
import { ReportPeriodTypesEnum } from '@core/interfaces/report-settings.interfaces';

interface IPeriodTypeDataSourceOption {
  id: ReportPeriodTypesEnum;
  name: string;
}

export const periodTypeDataSource: IPeriodTypeDataSourceOption[] = [
  { id: ReportPeriodTypesEnum.DATE, name: 'Date' },
  { id: ReportPeriodTypesEnum.SPRINT, name: 'Sprint' }
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
