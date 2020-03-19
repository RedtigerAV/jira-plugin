import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { of, Observable } from 'rxjs';
import { TableSettingsPeriodTypesEnum } from '../../modules/shared/table-settings/interfaces/table-settings-form.interface';

interface IPeriodTypeDataSourceOption {
  id: TableSettingsPeriodTypesEnum;
  name: string;
}

export class PeriodTypeDataSource implements ISelectDataSource {
  public data$: Observable<IPeriodTypeDataSourceOption[]> = of([
    { id: TableSettingsPeriodTypesEnum.DATE, name: 'Date' },
    { id: TableSettingsPeriodTypesEnum.SPRINT, name: 'Sprint' }
  ]);

  public getValue(option: IPeriodTypeDataSourceOption): string {
    return option.id;
  }

  public displayWith(option: IPeriodTypeDataSourceOption): string {
    return option.name;
  }
}
