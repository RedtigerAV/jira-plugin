import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Sprint } from '@core/api/software/model/sprint';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { PaginatedSprints } from '@core/api/software/model/paginatedSprints';

export class SprintsDataSource implements ISelectDataSource {
  public data$: Observable<Sprint[]>;

  constructor(boardId$: Observable<string>, sprintsService: SprintsService) {
    // this.data$ = boardId$
    //   .pipe(
    //     switchMap(id => {
    //       if (!id) {
    //         return of({values: []});
    //       }
    //
    //       return sprintsService.searchSprint(id, 'active,closed');
    //     }),
    //     map(({values}: PaginatedSprints) =>
    //       values.length ? [{id: undefined, name: '---------'}, ...values] : [])
    //   );

    this.data$ = of([]);
  }

  public getValue(option: Sprint): string {
    return option && option.id && option.id.toString();
  }

  public displayWith(option: Sprint): string {
    return option && option.name;
  }
}
