import { StatusDetailsModel } from '@core/api/platform/model/statusDetails';

export interface ColumnConfiguration {
  columns: Array<Column>;
}

export interface Column {
  name: string;
  statuses: Array<StatusDetailsModel>;
}
