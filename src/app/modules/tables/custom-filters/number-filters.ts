import { IFilterOptionDef } from 'ag-grid-community';

export const numberFilters: IFilterOptionDef[] = [
  {
    displayKey: 'equalNumberCustom',
    displayName: 'Равно',
    test: (filterValue, cellValue) => Math.abs(filterValue - cellValue) < 0.001
  },
  {
    displayKey: 'notEqualNumberCustom',
    displayName: 'Не равно',
    test: (filterValue, cellValue) => Math.abs(filterValue - cellValue) > 0.001
  },
  {
    displayKey: 'lessThanNumberCustom',
    displayName: 'Меньше чем',
    test: (filterValue, cellValue) => filterValue > cellValue
  },
  {
    displayKey: 'greaterThanNumberCustom',
    displayName: 'Больше чем',
    test: (filterValue, cellValue) => filterValue < cellValue
  },
  {
    displayKey: 'lessThanOrEqualNumberCustom',
    displayName: 'Меньше или равно чем',
    test: (filterValue, cellValue) => filterValue >= cellValue
  },
  {
    displayKey: 'greaterThanOrEqualNumberCustom',
    displayName: 'Больше или равно чем',
    test: (filterValue, cellValue) => filterValue <= cellValue
  },
];
