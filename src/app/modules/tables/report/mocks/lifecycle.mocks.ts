import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { TableFilterEnum } from '@core/interfaces/table-filter.interfaces';

export function getColumnsDef(): ITableColumn[] {
  return [
    {
      field: 'athlete',
      filter: TableFilterEnum.TEXT,
    },
    {
      field: 'age',
      filter: TableFilterEnum.NUMBER,
    },
    {
      field: 'country',
      filter: TableFilterEnum.TEXT,
    },
    {
      field: 'year',
    },
    { field: 'sport' },
    {
      field: 'gold',
      filter: TableFilterEnum.NUMBER,
    },
    {
      field: 'silver',
      filter: TableFilterEnum.NUMBER,
    },
    {
      field: 'bronze',
      filter: TableFilterEnum.NUMBER,
    },
    {
      field: 'total',
      filter: TableFilterEnum.NUMBER,
    },
  ];
}

export function getDefaultColumnDefs(): ITableDefaultColumn {
  return {
    flex: 1,
    minWidth: 150,
    minHeight: 100,
    sortable: true,
    resizable: true,
    filterParams: {
      applyButton: true,
      resetButton: true,
    }
  };
}
