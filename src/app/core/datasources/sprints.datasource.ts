import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface ISprintDataSourceOption {
  id: string;
  name: string;
}

const JTTSprints: Observable<ISprintDataSourceOption[]> = of([
  { id: undefined, name: '------' },
  { id: '1', name: 'Спринт 1' }
]);

const clearSprints: Observable<ISprintDataSourceOption[]> = of([
  { id: undefined, name: '------' }
]);

export class SprintsDataSource implements ISelectDataSource {
  public data$: Observable<ISprintDataSourceOption[]>;

  constructor(boardId$: Observable<string>) {
    this.data$ = boardId$
      .pipe(
        switchMap(id => {
          if (id === '1') {
            return JTTSprints;
          }

          return clearSprints;
        })
      );
  }

  public getValue(option: ISprintDataSourceOption): string {
    return option.id;
  }

  public displayWith(option: ISprintDataSourceOption): string {
    return option.name;
  }
}
