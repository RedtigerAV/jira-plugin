import { Injectable } from '@angular/core';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { Observable, of } from 'rxjs';
import { ITableFilter, TableFilterTextTypeEnum } from '@core/interfaces/table-filter.interfaces';
import * as uuid from 'uuid';

@Injectable()
export class ReportFiltersService {
  private cache: ITableFilter[] = [
    {
      id: uuid.v4(),
      name: 'First filter',
      state: {
        user: {
          filterType: 'text',
          type: TableFilterTextTypeEnum.CONTAINS,
          filter: 'Vakh',
          columnPreview: {
            field: 'user',
            headerName: 'User'
          }
        }
      }
    },
    {
      id: uuid.v4(),
      name: 'Test filter',
      state: {
        user: {
          filterType: 'text',
          type: TableFilterTextTypeEnum.CONTAINS,
          operator: 'AND',
          columnPreview: {
            field: 'user',
            headerName: 'User'
          },
          condition1: {
            filterType: 'text',
            type: TableFilterTextTypeEnum.CONTAINS,
            filter: 'Vakhrushin'
          },
          condition2: {
            filterType: 'text',
            type: TableFilterTextTypeEnum.STARTS_WITH,
            filter: 'Anton'
          },
        }
      }
    }
  ];

  public getFilters(tableID: TableID): Observable<ITableFilter[]> {
    return of(this.cache);
  }

  public saveFilter(tableID: TableID, filter: ITableFilter): Observable<any> {
    filter.id = uuid.v4();

    this.cache.unshift(filter);

    return of(this.cache);
  }

  public patchFilter(tableID: TableID, filter: ITableFilter): Observable<any> {
    let position = this.cache.findIndex(({id}) => id === filter.id);
    this.cache.splice(position, 1, filter);

    return of(this.cache);
  }

  public deleteFilter(tableID: TableID, filterID: string): Observable<any> {
    let position = this.cache.findIndex(filter => filter.id === filterID);
    this.cache.splice(position, 1);

    return of(this.cache);
  }
}
