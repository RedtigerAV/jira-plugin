import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedBoards } from '@core/api/software/model/paginatedBoards';
import { ApiBase } from '@core/api/software/api/api-base';
import { BoardConfiguration } from '@core/api/software/model/boardConfiguration';
import { BoardType } from '@core/api/software/model/boardType';

@Injectable({
  providedIn: 'root'
})
export class BoardsService extends ApiBase {

  constructor(protected readonly http: HttpClient) {
    super();
  }

  public searchBoards(name?: string, projectKeyOrId?: string, type?: BoardType): Observable<PaginatedBoards> {
    let queryParameters = this.defaultParams;

    queryParameters = queryParameters.append('name', name);
    queryParameters = queryParameters.append('projectKeyOrId', projectKeyOrId);

    return this.http.get<PaginatedBoards>(`${this.basePath}/rest/agile/1.0/board`, {params: queryParameters});
  }

  public getBoardConfiguration(boardID: string): Observable<BoardConfiguration> {
    return this.http.get<BoardConfiguration>(`${this.basePath}/rest/agile/1.0/board/${boardID}/configuration`);
  }
}
