import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BoardsService } from '@core/api/software/api/boards.service';
import { Board } from '@core/api/software/model/board';
import { PaginatedBoards } from '@core/api/software/model/paginatedBoards';

export class BoardsDataSource implements ISelectDataSource {
  public data$: Observable<Board[]>;

  constructor(projectId$: Observable<string>, boardsService: BoardsService) {
    this.data$ = projectId$
      .pipe(
        switchMap(id => {
          if (!id) {
            return of({values: []});
          }

          return boardsService.searchBoards('', id);
        }),
        map(({values}: PaginatedBoards) =>
          values.length ? [{id: undefined, name: '---------'}, ...values] : [])
      );
  }

  public getValue(option: Board): string | undefined {
    return option.id && option.id.toString();
  }

  public displayWith(option: Board): string {
    return option.name;
  }
}
