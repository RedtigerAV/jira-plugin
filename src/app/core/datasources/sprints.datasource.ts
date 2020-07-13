import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sprint } from '@core/api/software/model/sprint';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { PaginatedSprints } from '@core/api/software/model/paginatedSprints';
import { DataSourceBase } from '@core/datasources/datasource.base';

export class SprintsDataSource extends DataSourceBase<Sprint, string> {
  constructor(private readonly sprintsService: SprintsService) {
    super();
  }

  public getKey(option: Sprint): string {
    return option && option.id && option.id.toString();
  }

  public displayWith(option: Sprint): string {
    return option && option.name;
  }

  protected getData(filter: string): Observable<Sprint[]> {
    if (!filter) {
      return of([]);
    }

    return this.sprintsService.searchSprints(filter, 'active,closed').pipe(map(({values}: PaginatedSprints) => values));
  }
}
