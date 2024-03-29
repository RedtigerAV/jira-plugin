import { BoardLocation } from '@core/api/software/model/boardLocation';
import { BoardType } from '@core/api/software/model/boardType';

export interface Board {
  id: number;
  self?: string;
  name?: string;
  type?: BoardType;
  location?: BoardLocation;
}
