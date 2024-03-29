import { IReportFiltersComponent } from './report-filters.interfaces';
import { IReportSortsComponent } from './report-sorts.interfaces';
import { IReportSettingsComponent } from './report-settings.interfaces';
import { IReportTableComponent } from './report-table.interfaces';

export enum ReportMediatorEventsEnum {
  GENERATE_TABLE = 'generate_table',
  SAVE_FILTER = 'save_filter',
  SAVE_SORT = 'save_sort',
  APPLY_FILTER = 'apply_filter',
  FILTER_CHANGED = 'filter_changed',
  RESET_ALL_FILTERS = '',
  APPLY_SORT = 'apply_sort',
  SORT_CHANGED = 'sort_changed',
  RESET_ALL_SORTS = 'reset_all_sorts',
  APPLY_DEFAULT_SETTINGS = 'apply_default_settings',
  SAVE_SETTINGS_AS_DEFAULT = 'save_settings_as_default',
  EXPORT_AS_CSV = 'export_as_csv'
}

export interface IReportMediator {
  reportActionsComponent: any;
  reportFiltersComponent: IReportFiltersComponent;
  reportSortsComponent: IReportSortsComponent;
  reportSettingsComponent: IReportSettingsComponent;
  reportTableComponent: IReportTableComponent;
  notify(event: ReportMediatorEventsEnum): void;
}
