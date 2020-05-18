import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { Observable } from 'rxjs';
import { FoundGroupModel } from '@core/api/platform/model/foundGroup';
import { GroupsService } from '@core/api/platform/api/groups.service';
import { map, tap } from 'rxjs/operators';

export class GroupsDataSource implements ISelectDataSource {
  public data$: Observable<FoundGroupModel[]>;
  private cache: FoundGroupModel[];

  constructor(groupsService: GroupsService) {
    this.data$ = groupsService.findGroups()
      .pipe(
        map(result => [{id: undefined, name: 'Очистить поле'}, ...result.groups]),
        tap(result => (this.cache = result))
      );
  }

  public getValue(option: FoundGroupModel): string {
    return option && option.name;
  }

  public getOptionByValue(value: string): FoundGroupModel {
    return this.cache.find(option => this.getValue(option) === value);
  }

  public displayWith(option: FoundGroupModel): string {
    return option && option.name;
  }
}
