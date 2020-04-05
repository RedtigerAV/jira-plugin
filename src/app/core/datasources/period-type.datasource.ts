import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { of, Observable } from 'rxjs';
import { ReportPeriodTypesEnum } from '@core/interfaces/report-settings.interfaces';

interface IPeriodTypeDataSourceOption {
  id: ReportPeriodTypesEnum;
  name: string;
}

export class PeriodTypeDataSource implements ISelectDataSource {
  public data$: Observable<IPeriodTypeDataSourceOption[]> = of([
    { id: ReportPeriodTypesEnum.DATE, name: 'Date' },
    { id: ReportPeriodTypesEnum.SPRINT, name: 'Sprint' }
  ]);

  public getValue(option: IPeriodTypeDataSourceOption): string {
    return option && option.id;
  }

  public displayWith(option: IPeriodTypeDataSourceOption): string {
    return option && option.name;
  }
}
