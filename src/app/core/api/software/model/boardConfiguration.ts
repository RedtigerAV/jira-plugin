import { BoardLocation } from '@core/api/software/model/boardLocation';
import { BoardType } from '@core/api/software/model/boardType';
import { ColumnConfiguration } from '@core/api/software/model/columnConfiguration';

export interface BoardConfiguration {
  id: number;
  self?: string;
  name?: string;
  type?: BoardType;
  location?: BoardLocation;
  columnConfig: ColumnConfiguration;
}
