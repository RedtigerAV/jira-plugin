import { Injectable } from '@angular/core';
import { BoardsService } from '@core/api/software/api/boards.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface IPlanningStorage {
  [userID: string]: {
    [sprintID: string]: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlanningStorageService {
  private key = `${environment.addonKey}-planning-storage`;

  constructor(private readonly boardsService: BoardsService) {}

  public getPlanningStorage(boardID: string): Observable<IPlanningStorage> {
    return this.boardsService.getBoardPropertyKeys(boardID)
      .pipe(
        switchMap(({keys}) => {
          const isPropertyExist = keys.some(({key}) => key === this.key);

          return isPropertyExist
            ? this.boardsService.getBoardProperty(boardID, this.key)
            : of({value: null});
        }),
        catchError(() => of({value: null})),
        map(({value}) => value)
      );
  }

  public setPlanningStorage(boardID: string, planning: IPlanningStorage): Observable<IPlanningStorage> {
    return this.boardsService.setBoardProperty(boardID, this.key, planning)
      .pipe(
        map(() => planning),
        catchError(() => of(null))
      );
  }
}
