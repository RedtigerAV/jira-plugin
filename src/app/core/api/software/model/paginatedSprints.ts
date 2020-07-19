import { Sprint } from '@core/api/software/model/sprint';

export interface PaginatedSprints {
  total: number;
  startAt?: number;
  maxResults?: number;
  isLast: boolean;
  values: Array<Sprint>;
}
