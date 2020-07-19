import { Board } from '@core/api/software/model/board';

export interface PaginatedBoards {
  total: number;
  startAt?: number;
  maxResults?: number;
  isLast: boolean;
  values: Array<Board>;
}
