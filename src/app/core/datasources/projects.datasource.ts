import { Observable } from 'rxjs';
import { ProjectsService } from '@core/api/platform/api/projects.service';
import { ProjectModel } from '@core/api/platform/model/project';
import { map } from 'rxjs/operators';
import { DataSourceBase } from '@core/datasources/datasource.base';
import { retryRequestOperator } from '@core/rxjs-operators/request-retry/retry-request.operator';
import { PageBeanProjectModel } from '@core/api/platform/model/pageBeanProject';

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
    return retryRequestOperator<PageBeanProjectModel, ProjectModel>(
      this.projectsService,
      this.projectsService.searchProjects,
      [0, 50],
      response => response.values,
      response => !response.isLast,
      functionArguments => {
        functionArguments[0] += 50;

        return functionArguments;
      }
    );
  }
}
