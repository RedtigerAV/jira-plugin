import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BoardsService } from '@core/api/software/api/boards.service';
import { Board } from '@core/api/software/model/board';
import { PaginatedBoards } from '@core/api/software/model/paginatedBoards';

export class BoardsDataSource implements ISelectDataSource {
  public data$: Observable<Board[]>;
  // private cache: Board[];
  private cache = [{id: undefined, name: '---------'}, {id: 1234, name: 'LOL Board'}];

  constructor(projectId$: Observable<string>, boardsService: BoardsService) {
    // this.data$ = projectId$
    //   .pipe(
    //     switchMap(id => {
    //       if (!id) {
    //         return of({values: []});
    //       }
    //
    //       return boardsService.searchBoards('', id);
    //     }),
    //     map(({values}: PaginatedBoards) =>
    //       values.length ? [{id: undefined, name: '---------'}, ...values] : []),
    //     tap(result => (this.cache = result))
    //   );

    this.data$ = of([{id: undefined, name: '---------'}, {id: 1234, name: 'LOL Board'}]);
  }

  public getValue(option: Board): string | undefined {
    return option && option.id && option.id.toString();
  }

  public getOptionByValue(value: string): Board {
    return this.cache.find(option => this.getValue(option) === value);
  }

  public displayWith(option: Board): string {
    return option && option.name;
  }
}
