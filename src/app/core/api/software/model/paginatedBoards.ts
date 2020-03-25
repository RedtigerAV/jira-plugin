import { Board } from '@core/api/software/model/board';

export interface PaginatedBoards {
  total: number;
  values: Array<Board>;
}
