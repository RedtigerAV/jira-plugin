import { Sprint } from '@core/api/software/model/sprint';

export interface PaginatedSprints {
  total: number;
  values: Array<Sprint>;
}
