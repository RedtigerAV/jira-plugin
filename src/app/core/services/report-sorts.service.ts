import { Injectable } from '@angular/core';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { Observable, of } from 'rxjs';
import * as uuid from 'uuid';
import { ITableSort } from '@core/interfaces/table-sort.interfaces';

@Injectable()
export class ReportSortsService {
  private cache: ITableSort[] = [
    {
      id: uuid.v4(),
      name: 'Sort by user',
      state: [
        {
          colId: 'user',
          sort: 'asc',
          columnPreview: {
            field: 'user',
            headerName: 'User'
          }
        },
        {
          colId: 'issueName',
          sort: 'desc',
          columnPreview: {
            field: 'issueName',
            headerName: 'Issue Name'
          }
        }
      ]
    }
  ];

  public getSorts(tableID: TableID): Observable<ITableSort[]> {
    return of(this.cache);
  }

  public saveSort(tableID: TableID, sort: ITableSort): Observable<any> {
    sort.id = uuid.v4();

    this.cache.unshift(sort);

    return of(this.cache);
  }

  public patchSort(tableID: TableID, sort: ITableSort): Observable<any> {
    let position = this.cache.findIndex(({id}) => id === sort.id);
    this.cache.splice(position, 1, sort);

    return of(this.cache);
  }

  public deleteSort(tableID: TableID, sortID: string): Observable<any> {
    let position = this.cache.findIndex(filter => filter.id === sortID);
    this.cache.splice(position, 1);

    return of(this.cache);
  }
}
