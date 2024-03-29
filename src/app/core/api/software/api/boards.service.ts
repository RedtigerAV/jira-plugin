import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedBoards } from '@core/api/software/model/paginatedBoards';
import { ApiBase } from '@core/api/software/api/api-base';
import { BoardConfiguration } from '@core/api/software/model/boardConfiguration';
import { PropertyKeysModel } from '@core/api/platform/model/propertyKeys';
import { EntityPropertyModel } from '@core/api/platform/model/entityProperty';
import { OperationMessageModel } from '@core/api/platform/model/operationMessage';

@Injectable({
  providedIn: 'root'
})
export class BoardsService extends ApiBase {

  constructor(protected readonly http: HttpClient) {
    super();
  }

  public searchBoards(name?: string, projectKeyOrId?: string, startAt?: number, maxResults?: number): Observable<PaginatedBoards> {
    let queryParameters = this.defaultParams;

    if (name !== undefined && name !== null) {
      queryParameters = queryParameters.append('name', name);
    }

    if (projectKeyOrId !== undefined && projectKeyOrId !== null) {
      queryParameters = queryParameters.append('projectKeyOrId', projectKeyOrId);
    }

    if (startAt !== undefined && startAt !== null) {
      queryParameters = queryParameters.append('startAt', <any>startAt);
    }

    if (maxResults !== undefined && maxResults !== null) {
      queryParameters = queryParameters.append('maxResults', <any>maxResults);
    }

    return this.http.get<PaginatedBoards>(`${this.basePath}/rest/agile/1.0/board`, {params: queryParameters});
  }

  public getBoardConfiguration(boardID: string): Observable<BoardConfiguration> {
    return this.http.get<BoardConfiguration>(`${this.basePath}/rest/agile/1.0/board/${boardID}/configuration`);
  }

  public getBoardPropertyKeys(boardID: string): Observable<PropertyKeysModel> {
    return this.http.get<PropertyKeysModel>(`${this.basePath}/rest/agile/1.0/board/${boardID}/properties`);
  }

  public getBoardProperty(boardID: string, propertyKey: string): Observable<EntityPropertyModel> {
    return this.http.get<EntityPropertyModel>(`${this.basePath}/rest/agile/1.0/board/${boardID}/properties/${propertyKey}`);
  }

  public setBoardProperty(boardID: string, propertyKey: string, body: any): Observable<OperationMessageModel> {
    return this.http.put<OperationMessageModel>(`${this.basePath}/rest/agile/1.0/board/${boardID}/properties/${propertyKey}`, body);
  }
}
