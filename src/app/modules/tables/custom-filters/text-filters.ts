import { IFilterOptionDef } from 'ag-grid-community';

export const textFilters: IFilterOptionDef[] = [
  {
    displayKey: 'containsTextCustom',
    displayName: 'Содержит',
    test: (filterValue, cellValue) => (cellValue || '').toString().toLowerCase().includes((filterValue || '').toString().toLowerCase())
  },
  {
    displayKey: 'notContainsTextCustom',
    displayName: 'Не содержит',
    test: (filterValue, cellValue) => !(cellValue || '').toString().toLowerCase().includes((filterValue || '').toString().toLowerCase())
  },
  {
    displayKey: 'equalTextCustom',
    displayName: 'Эквивалентно',
    test: (filterValue, cellValue) => (filterValue || '').toString().toLowerCase() === (cellValue || '').toString().toLowerCase()
  },
  {
    displayKey: 'notEqualTextCustom',
    displayName: 'Не эквивалентно',
    test: (filterValue, cellValue) => (filterValue || '').toString().toLowerCase() !== (cellValue || '').toString().toLowerCase()
  },
  {
    displayKey: 'startsWithTextCustom',
    displayName: 'Начинается с',
    test: (filterValue, cellValue) => (cellValue || '').toString().toLowerCase().startsWith((filterValue || '').toString().toLowerCase())
  },
  {
    displayKey: 'endsWithTextCustom',
    displayName: 'Заканчивается на',
    test: (filterValue, cellValue) => !(cellValue || '').toString().toLowerCase().endsWith((filterValue || '').toString().toLowerCase())
  }
];
