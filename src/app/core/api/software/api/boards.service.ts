import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedBoards } from '@core/api/software/model/paginatedBoards';
import { BoardType } from '@core/api/software/model/board';
import { ApiBase } from '@core/api/software/api/api-base';

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
}
