import { Injectable } from '@angular/core';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { Observable, of } from 'rxjs';
import { ITableFilter } from '@core/interfaces/table-filter.interfaces';
import * as uuid from 'uuid';

@Injectable()
export class ReportFiltersService {
  private cache = new Map<TableID, ITableFilter[]>();

  public getFilters(tableID: TableID): Observable<ITableFilter[]> {
    return of(this.cache.get(tableID));
  }

  public saveFilter(tableID: TableID, filter: ITableFilter): Observable<any> {
    filter.id = uuid.v4();

    if (!this.cache.get(tableID)) {
      this.cache.set(tableID, []);
    }

    this.cache.get(tableID).unshift(filter);

    return of(this.cache.get(tableID));
  }

  public patchFilter(tableID: TableID, filter: ITableFilter): Observable<any> {
    if (!this.cache.get(tableID)) {
      this.cache.set(tableID, []);
    }

    let position = this.cache.get(tableID).findIndex(({id}) => id === filter.id);
    this.cache.get(tableID).splice(position, 1, filter);

    return of(this.cache.get(tableID));
  }

  public deleteFilter(tableID: TableID, filterID: string): Observable<any> {
    if (!this.cache.get(tableID)) {
      this.cache.set(tableID, []);
    }

    let position = this.cache.get(tableID).findIndex(filter => filter.id === filterID);
    this.cache.get(tableID).splice(position, 1);

    return of(this.cache.get(tableID));
  }
}
