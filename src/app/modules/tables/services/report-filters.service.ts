import { Injectable } from '@angular/core';
import { TableID } from '@core/interfaces/structure.interfaces';
import { forkJoin, Observable, of } from 'rxjs';
import { ITableFilter } from '../interfaces/table-filter.interfaces';
import * as uuid from 'uuid';
import { AppPropertiesService } from '@core/api/platform/api/appProperties.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ReportFiltersService {
  private prefix = 'filters';

  constructor(private readonly appPropertiesService: AppPropertiesService) {}

  public getFilters(tableID: TableID): Observable<ITableFilter[]> {
    return this.appPropertiesService.getAddonProperties(environment.addonKey)
      .pipe(
        switchMap(({keys}) => {
          const currentKey = this.getPropertyKey(tableID);
          const isPropertyExist = keys.some(({key}) => key === currentKey);

          return isPropertyExist
            ? this.appPropertiesService.getAddonProperty(environment.addonKey, currentKey)
            : of({value: []});
        }),
        catchError(() => of({value: []})),
        map(({value}) => (value || []) as ITableFilter[])
      )
  }

  public saveFilter(tableID: TableID, filter: ITableFilter): Observable<ITableFilter[]> {
    filter.id = uuid.v4();

    return this.getFilters(tableID)
      .pipe(
        switchMap(filters => {
          const newFilters = [filter, ...filters];

          return forkJoin(
            of(newFilters),
            this.appPropertiesService.putAddonProperty(environment.addonKey, this.getPropertyKey(tableID), newFilters)
          )
        }),
        map(([filters]) => filters)
      );
  }

  public patchFilter(tableID: TableID, filter: ITableFilter): Observable<ITableFilter[]> {
    return this.getFilters(tableID)
      .pipe(
        switchMap(filters => {
          let position = filters.findIndex(({id}) => id === filter.id);
          filters.splice(position, 1, filter);

          return forkJoin(
            of(filters),
            this.appPropertiesService.putAddonProperty(environment.addonKey, this.getPropertyKey(tableID), filters)
          );
        }),
        map(([filters]) => filters)
      );
  }

  public deleteFilter(tableID: TableID, filterID: string): Observable<ITableFilter[]> {
    return this.getFilters(tableID)
      .pipe(
        switchMap(filters => {
          let position = filters.findIndex(({id}) => id === filterID);
          filters.splice(position, 1);

          return forkJoin(
            of(filters),
            this.appPropertiesService.putAddonProperty(environment.addonKey, this.getPropertyKey(tableID), filters)
          );
        }),
        map(([filters]) => filters)
      );
  }

  private getPropertyKey(tableID: TableID): string {
    return `${this.prefix}-${tableID}`;
  }
}
