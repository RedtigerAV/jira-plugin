import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface IBoardDataSourceOption {
  id: string;
  name: string;
}

const JTTBoards: Observable<IBoardDataSourceOption[]> = of([
  { id: undefined, name: '------' },
  { id: '1', name: 'Доска JTT' }
]);

const clearSprints: Observable<IBoardDataSourceOption[]> = of([
  { id: undefined, name: '------' }
]);

export class BoardsDataSource implements ISelectDataSource {
  public data$: Observable<IBoardDataSourceOption[]>;

  constructor(projectId$: Observable<string>) {
    this.data$ = projectId$
      .pipe(
        switchMap(id => {
          if (id === '1') {
            return JTTBoards;
          }

          return clearSprints;
        })
      );
  }

  public getValue(option: IBoardDataSourceOption): string {
    return option.id;
  }

  public displayWith(option: IBoardDataSourceOption): string {
    return option.name;
  }
}
