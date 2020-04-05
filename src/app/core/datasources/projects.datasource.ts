import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { Observable, of } from 'rxjs';
import { ProjectsService } from '@core/api/platform/api/projects.service';
import { ProjectModel } from '@core/api/platform/model/project';
import { map } from 'rxjs/operators';

export class ProjectsDataSource implements ISelectDataSource {
  public readonly data$: Observable<ProjectModel[]>;

  constructor(projectsService: ProjectsService) {
    // this.data$ = projectsService.searchProjects(0, 1000)
    //   .pipe(map(result => [{id: undefined, name: '---------'}, ...result.values]));

    this.data$ = of([{id: undefined, name: '---------'}, {id: '1234', name: 'LOL'}]);
  }

  public getValue(option: ProjectModel): string {
    return option && option.id;
  }

  public displayWith(option: ProjectModel): string {
    return option && option.name;
  }
}
