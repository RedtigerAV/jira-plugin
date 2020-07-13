import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardsService } from '@core/api/software/api/boards.service';
import { Board } from '@core/api/software/model/board';
import { PaginatedBoards } from '@core/api/software/model/paginatedBoards';
import { DataSourceBase } from '@core/datasources/datasource.base';

export class BoardsDataSource extends DataSourceBase<Board, string> {
  constructor(private readonly boardsService: BoardsService) {
    super();
  }

  public getKey(option: Board): string | undefined {
    return option && option.id && option.id.toString();
  }

  public displayWith(option: Board): string {
    return option && option.name;
  }

  protected getData(filter: string): Observable<Board[]> {
    if (!filter) {
      return of([]);
    }

    return this.boardsService.searchBoards('', filter).pipe(map(({values}: PaginatedBoards) => values));
  }
}
