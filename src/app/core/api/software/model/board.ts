import { BoardLocation } from '@core/api/software/model/boardLocation';

export type BoardType = 'scrum' | 'kanban' | 'agility' | 'simple';

export interface Board {
  id: number;
  self?: string;
  name?: string;
  type?: BoardType;
  location?: BoardLocation;
}
