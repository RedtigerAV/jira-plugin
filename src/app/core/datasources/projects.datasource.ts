import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { of, Observable } from 'rxjs';

interface IProjectDataSourceOption {
  id: string;
  name: string;
}

export class ProjectsDataSource implements ISelectDataSource {
  public data$: Observable<IProjectDataSourceOption[]> = of([
    { id: undefined, name: '------' },
    { id: '1', name: 'Jira Time Tracking' }
  ]);

  public getValue(option: IProjectDataSourceOption): string {
    return option.id;
  }

  public displayWith(option: IProjectDataSourceOption): string {
    return option.name;
  }
}
