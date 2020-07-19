import { FoundGroupModel } from '@core/api/platform/model/foundGroup';
import { GroupsService } from '@core/api/platform/api/groups.service';
import { DataSourceBase } from '@core/datasources/datasource.base';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class GroupsDataSource extends DataSourceBase<FoundGroupModel, void>{
  constructor(private readonly groupsService: GroupsService) {
    super();
  }

  public getKey(option: FoundGroupModel): string {
    return option && option.name;
  }

  public displayWith(option: FoundGroupModel): string {
    return option && option.name;
  }

  protected getData(): Observable<FoundGroupModel[]> {
    // ToDo: если использовать, то заюзать retryRequestOperator
    return this.groupsService.findGroups().pipe(map(result => result.groups));
  }
}
