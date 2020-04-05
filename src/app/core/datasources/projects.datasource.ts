import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { Observable, of } from 'rxjs';
import { ProjectsService } from '@core/api/platform/api/projects.service';
import { ProjectModel } from '@core/api/platform/model/project';
import { map, tap } from 'rxjs/operators';

export class ProjectsDataSource implements ISelectDataSource {
  public readonly data$: Observable<ProjectModel[]>;
  // private cache: ProjectModel[];
  private cache = [{id: undefined, name: '---------'}, {id: '1234', name: 'LOL'}];

  constructor(projectsService: ProjectsService) {
    // this.data$ = projectsService.searchProjects(0, 1000)
    //   .pipe(
    //     map(result => [{id: undefined, name: '---------'}, ...result.values]),
    //     tap(result => (this.cache = result))
    //   );

    this.data$ = of([{id: undefined, name: '---------'}, {id: '1234', name: 'LOL Project'}]);
  }

  public getValue(option: ProjectModel): string {
    return option && option.id;
  }

  public getOptionByValue(value: string): ProjectModel {
    return this.cache.find(option => this.getValue(option) === value);
  }

  public displayWith(option: ProjectModel): string {
    return option && option.name;
  }
}
