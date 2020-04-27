import { Injectable } from '@angular/core';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { Observable, of } from 'rxjs';
import * as uuid from 'uuid';
import { ITableSort } from '@core/interfaces/table-sort.interfaces';

@Injectable()
export class ReportSortsService {
  private cache = new Map<TableID, ITableSort[]>();

  public getSorts(tableID: TableID): Observable<ITableSort[]> {
    console.log('GET: ', this.cache);

    return of(this.cache.get(tableID));
  }

  public saveSort(tableID: TableID, sort: ITableSort): Observable<any> {
    sort.id = uuid.v4();

    if (!this.cache.get(tableID)) {
      this.cache.set(tableID, []);
    }

    this.cache.get(tableID).unshift(sort);

    return of(this.cache.get(tableID));
  }

  public patchSort(tableID: TableID, sort: ITableSort): Observable<any> {
    if (!this.cache.get(tableID)) {
      this.cache.set(tableID, []);
    }

    let position = this.cache.get(tableID).findIndex(({id}) => id === sort.id);
    this.cache.get(tableID).splice(position, 1, sort);

    return of(this.cache.get(tableID));
  }

  public deleteSort(tableID: TableID, sortID: string): Observable<any> {
    if (!this.cache.get(tableID)) {
      this.cache.set(tableID, []);
    }

    let position = this.cache.get(tableID).findIndex(filter => filter.id === sortID);
    this.cache.get(tableID).splice(position, 1);

    return of(this.cache.get(tableID));
  }
}
