import { SearchResultsModel } from '@core/api/platform/model/searchResults';
import { IssueBeanModel } from '@core/api/platform/model/issueBean';
import { PaginatedSprints } from '@core/api/software/model/paginatedSprints';
import { Sprint } from '@core/api/software/model/sprint';

export const ISSUES_DEFAULT_PAGE_SIZE = 100;

export function issuesSearchRetryRule(response: SearchResultsModel, defaultPageSize: number = ISSUES_DEFAULT_PAGE_SIZE): boolean {
  return response.startAt + defaultPageSize < response.total;
}

export function issuesValuesMapper(response: SearchResultsModel): IssueBeanModel[] {
  return response.issues;
}

export function issuesIncrementArgumentsRule(functionArguments: any[], defaultPageSize: number = ISSUES_DEFAULT_PAGE_SIZE): any[] {
  functionArguments[1] += defaultPageSize;

  return functionArguments;
}

export const SPRINTS_DEFAULT_PAGE_SIZE = 50;

export function sprintsSearchRetryRule(response: PaginatedSprints): boolean {
  return !response.isLast;
}

export function sprintsValuesMapper(response: PaginatedSprints): Sprint[] {
  return response.values;
}

export function sprintsIncrementArgumentsRule(functionArguments: any[], defaultPageSize: number = SPRINTS_DEFAULT_PAGE_SIZE): any[] {
  functionArguments[1] += defaultPageSize;

  return functionArguments;
}
