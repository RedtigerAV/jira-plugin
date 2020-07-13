import { Observable } from 'rxjs';
import { ProjectsService } from '@core/api/platform/api/projects.service';
import { ProjectModel } from '@core/api/platform/model/project';
import { map } from 'rxjs/operators';
import { DataSourceBase } from '@core/datasources/datasource.base';

export class ProjectsDataSource extends DataSourceBase<ProjectModel, void> {
  constructor(private readonly projectsService: ProjectsService) {
    super();
  }

  public getKey(option: ProjectModel): string {
    return option && option.id;
  }

  public displayWith(option: ProjectModel): string {
    return option && option.name;
  }

  protected getData(): Observable<ProjectModel[]> {
    return this.projectsService.searchProjects(0, 1000).pipe(map(result => result.values));
  }
}
