import { DataSourceBase } from '@core/datasources/datasource.base';
import { UserPickerUserModel } from '@core/api/platform/model/userPickerUser';
import { Observable, of } from 'rxjs';
import { UserSearchService } from '@core/api/platform/api/userSearch.service';
import { map } from 'rxjs/operators';

export class UsersDataSource extends DataSourceBase<UserPickerUserModel, string> {
  constructor(public readonly userSearchService: UserSearchService) {
    super();
  }

  displayWith(item: UserPickerUserModel): string {
    return item && item.displayName;
  }

  getKey(item: UserPickerUserModel): any {
    return item && item.accountId;
  }

  protected getData(filter: string): Observable<UserPickerUserModel[]> {
    if (!filter) {
      return of([]);
    }

    return this.userSearchService.findUsersForPicker(
      filter,
      1000,
      false,
      undefined,
      undefined,
      undefined,
      true
    ).pipe(map(({users}) => users));
  }
}
