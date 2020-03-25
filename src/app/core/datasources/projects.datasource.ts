import { ISelectDataSource } from '@shared/components/reactive-forms/select/select.component';
import { Observable } from 'rxjs';
import { ProjectsService } from '@core/api/platform/api/projects.service';
import { ProjectModel } from '@core/api/platform/model/project';
import { map } from 'rxjs/operators';

export class ProjectsDataSource implements ISelectDataSource {
  public readonly data$: Observable<ProjectModel[]>;

  constructor(projectsService: ProjectsService) {
    this.data$ = projectsService.searchProjects(0, 1000)
      .pipe(map(result => [{id: undefined, name: '---------'}, ...result.values]));
  }

  public getValue(option: ProjectModel): string {
    return option.id;
  }

  public displayWith(option: ProjectModel): string {
    return option.name;
  }
}
