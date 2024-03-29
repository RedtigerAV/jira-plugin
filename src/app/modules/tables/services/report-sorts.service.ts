import { Injectable } from '@angular/core';
import { TableID } from '@core/interfaces/structure.interfaces';
import { forkJoin, Observable, of } from 'rxjs';
import * as uuid from 'uuid';
import { ITableSort } from '../interfaces/table-sort.interfaces';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppPropertiesService } from '@core/api/platform/api/appProperties.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ReportSortsService {
  private prefix = 'sorts';

  constructor(private readonly appPropertiesService: AppPropertiesService) {}

  public getSorts(tableID: TableID): Observable<ITableSort[]> {
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
        map(({value}) => (value || []) as ITableSort[])
      )
  }

  public saveSort(tableID: TableID, sort: ITableSort): Observable<ITableSort[]> {
    sort.id = uuid.v4();

    return this.getSorts(tableID)
      .pipe(
        switchMap(sorts => {
          const newSorts = [sort, ...sorts];

          return forkJoin(
            of(newSorts),
            this.appPropertiesService.putAddonProperty(environment.addonKey, this.getPropertyKey(tableID), newSorts)
          )
        }),
        map(([sorts]) => sorts)
      );
  }

  public patchSort(tableID: TableID, sort: ITableSort): Observable<ITableSort[]> {
    return this.getSorts(tableID)
      .pipe(
        switchMap(sorts => {
          let position = sorts.findIndex(({id}) => id === sort.id);
          sorts.splice(position, 1, sort);

          return forkJoin(
            of(sorts),
            this.appPropertiesService.putAddonProperty(environment.addonKey, this.getPropertyKey(tableID), sorts)
          );
        }),
        map(([sorts]) => sorts)
      );
  }

  public deleteSort(tableID: TableID, sortID: string): Observable<ITableSort[]> {
    return this.getSorts(tableID)
      .pipe(
        switchMap(sorts => {
          let position = sorts.findIndex(({id}) => id === sortID);
          sorts.splice(position, 1);

          return forkJoin(
            of(sorts),
            this.appPropertiesService.putAddonProperty(environment.addonKey, this.getPropertyKey(tableID), sorts)
          );
        }),
        map(([sorts]) => sorts)
      );
  }

  private getPropertyKey(tableID: TableID): string {
    return `${this.prefix}-${tableID}`;
  }
}
