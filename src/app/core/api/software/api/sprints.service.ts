import { Injectable } from '@angular/core';
import { ApiBase } from '@core/api/software/api/api-base';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedSprints } from '@core/api/software/model/paginatedSprints';

@Injectable({
  providedIn: 'root'
})
export class SprintsService extends ApiBase {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public searchSprint(boardId: string, state?: string): Observable<PaginatedSprints> {
    let params = this.defaultParams;

    if (!!state) {
      params = params.append('state', state);
    }

    return this.http.get<PaginatedSprints>(`${this.basePath}/rest/agile/1.0/board/${boardId}/sprint`, {params});
  }
}
