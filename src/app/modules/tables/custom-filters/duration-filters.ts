import { IFilterOptionDef } from 'ag-grid-community';
import { DurationMapper } from '../duration-helpers/duration-mapper';

export const durationFilters: IFilterOptionDef[] = [
  {
    displayKey: 'equalDurationCustom',
    displayName: 'Равно',
    test: (filterValue, cellValue) =>
      Math.abs(DurationMapper.durationToSeconds(filterValue) - DurationMapper.roundSecondsToMinutes(cellValue)) < 60
  },
  {
    displayKey: 'notEqualDurationCustom',
    displayName: 'Не равно',
    test: (filterValue, cellValue) =>
      Math.abs(DurationMapper.durationToSeconds(filterValue) - DurationMapper.roundSecondsToMinutes(cellValue)) > 60
  },
  {
    displayKey: 'lessThanDurationCustom',
    displayName: 'Меньше чем',
    test: (filterValue, cellValue) => DurationMapper.durationToSeconds(filterValue) > DurationMapper.roundSecondsToMinutes(cellValue)
  },
  {
    displayKey: 'greaterThanDurationCustom',
    displayName: 'Больше чем',
    test: (filterValue, cellValue) => DurationMapper.durationToSeconds(filterValue) < DurationMapper.roundSecondsToMinutes(cellValue)
  },
  {
    displayKey: 'lessThanOrEqualDurationCustom',
    displayName: 'Меньше или равно чем',
    test: (filterValue, cellValue) => DurationMapper.durationToSeconds(filterValue) >= DurationMapper.roundSecondsToMinutes(cellValue)
  },
  {
    displayKey: 'greaterThanOrEqualDurationCustom',
    displayName: 'Больше или равно чем',
    test: (filterValue, cellValue) => DurationMapper.durationToSeconds(filterValue) <= DurationMapper.roundSecondsToMinutes(cellValue)
  },
];
