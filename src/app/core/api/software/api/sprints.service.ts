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

  public searchSprints(boardId: string, state?: string, startAt?: number, maxResults?: number): Observable<PaginatedSprints> {
    let params = this.defaultParams;

    if (!!state) {
      params = params.append('state', state);
    }
    if (startAt !== undefined && startAt !== null) {
      params = params.append('startAt', <any>startAt);
    }
    if (maxResults !== undefined && maxResults !== null) {
      params = params.append('maxResults', <any>maxResults);
    }

    return this.http.get<PaginatedSprints>(`${this.basePath}/rest/agile/1.0/board/${boardId}/sprint`, {params});
  }
}
