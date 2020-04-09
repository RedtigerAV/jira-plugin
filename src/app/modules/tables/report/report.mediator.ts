import { Injectable, OnDestroy } from '@angular/core';
import { IReportMediator, ReportMediatorEventsEnum } from './interfaces/report-mediator.interfaces';
import { IReportFiltersComponent } from './interfaces/report-filters.interfaces';
import { IReportSettingsComponent } from './interfaces/report-settings.interfaces';
import { IReportSortsComponent } from './interfaces/report-sorts.interfaces';
import { IReportTableComponent } from './interfaces/report-table.interfaces';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';
import { TgSnackbarDanger } from '@shared/components/tg-snackbar/models/tg-snackbar.models';
import { ITableFilter, ITableFilterState } from '@core/interfaces/table-filter.interfaces';
import { TableStateEnum } from '@core/interfaces/table-state.interface';
import { MatDialog } from '@angular/material';
import { ReportFilterModalComponent } from './report-filters/report-filter-modal/report-filter-modal.component';
import { take } from 'rxjs/operators';
import { ITableSort, ITableSortState } from '@core/interfaces/table-sort.interfaces';
import { ReportSortsModalComponent } from './report-sorts/report-sorts-modal/report-sorts-modal.component';

@Injectable()
export class ReportMediator implements OnDestroy, IReportMediator {
  reportActionsComponent: any;
  reportFiltersComponent: IReportFiltersComponent;
  reportSettingsComponent: IReportSettingsComponent;
  reportSortsComponent: IReportSortsComponent;
  reportTableComponent: IReportTableComponent;

  private filterApplied = false;
  private sortApplied = false;

  constructor(private readonly snackbar: TgSnackbarService,
              private readonly dialog: MatDialog) {
  }

  notify(event: ReportMediatorEventsEnum, payload?: any): void {
    switch (event) {
      case ReportMediatorEventsEnum.GENERATE_TABLE:
        this.generateTable();
        break;
      case ReportMediatorEventsEnum.EXPORT_AS_CSV:
        this.exportAsCSV();
        break;
      case ReportMediatorEventsEnum.APPLY_FILTER:
        this.applyFilter(payload);
        break;
      case ReportMediatorEventsEnum.FILTER_CHANGED:
        this.onFilterChanged();
        break;
      case ReportMediatorEventsEnum.RESET_ALL_FILTERS:
        this.resetAllFilters();
        break;
      case ReportMediatorEventsEnum.SAVE_FILTER:
        this.saveFilter();
        break;
      case ReportMediatorEventsEnum.APPLY_SORT:
        this.applySort(payload);
        break;
      case ReportMediatorEventsEnum.SAVE_SORT:
        this.saveSort();
        break;
      case ReportMediatorEventsEnum.RESET_ALL_SORTS:
        this.resetAllSorts();
        break;
      case ReportMediatorEventsEnum.SORT_CHANGED:
        this.onSortChanged();
        break;
      case ReportMediatorEventsEnum.APPLY_DEFAULT_SETTINGS:
        this.reportSettingsComponent.applyDefaultSettings();
        break;
      case ReportMediatorEventsEnum.SAVE_SETTINGS_AS_DEFAULT:
        this.reportSettingsComponent.saveSettingsAsDefault();
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {}

  get isTableLoaded(): boolean {
    return this.reportTableComponent.tableState$.value === TableStateEnum.LOADED;
  }

  private generateTable(): void {
    if (this.reportSettingsComponent.form.invalid) {
      markFormGroupTouched(this.reportSettingsComponent.form);
      this.snackbar.openSnackbar(new TgSnackbarDanger('Please fill in all required fields'));

      return;
    }

    const settings = this.reportSettingsComponent.form.getRawValue();

    this.reportTableComponent.generateTable(settings);
    this.reportFiltersComponent.resetSelectedFilter();
  }

  private applyFilter(filter: ITableFilter): void {
    this.filterApplied = true;
    this.reportTableComponent.applyFilter(filter.state);
  }

  private saveFilter(): void {
    if (!this.isTableLoaded) {
      this.snackbar.openSnackbar(new TgSnackbarDanger('Please generate table first'));

      return;
    }

    const filterState: ITableFilterState = this.reportTableComponent.getFilterState();

    if (!Object.keys(filterState).length) {
      this.snackbar.openSnackbar(new TgSnackbarDanger('Please filter some column'));

      return;
    }

    const dialogRef = this.dialog.open(ReportFilterModalComponent, {
      data: {
        title: 'New filter',
        filter: {
          name: '',
          state: filterState
        } as ITableFilter
      }
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(resultFilter => {
        if (resultFilter) {
          this.reportFiltersComponent.saveFilter(resultFilter);
        }
      });
  }

  private resetAllFilters(): void {
    if (!this.isTableLoaded) {
      this.snackbar.openSnackbar(new TgSnackbarDanger('Please generate table first'));

      return;
    }

    this.reportTableComponent.applyFilter({});
  }

  private onFilterChanged(): void {
    if (!this.filterApplied) {
      this.reportFiltersComponent.resetSelectedFilter();
    } else {
      this.filterApplied = false;
    }
  }

  private applySort(sort: ITableSort): void {
    this.sortApplied = true;
    this.reportTableComponent.applySort(sort.state);
  }

  private saveSort(): void {
    if (!this.isTableLoaded) {
      this.snackbar.openSnackbar(new TgSnackbarDanger('Please generate table first'));

      return;
    }

    const sortState: ITableSortState[] = this.reportTableComponent.getSortState();

    if (!sortState.length) {
      this.snackbar.openSnackbar(new TgSnackbarDanger('Please filter some column'));

      return;
    }

    const dialogRef = this.dialog.open(ReportSortsModalComponent, {
      data: {
        title: 'New sort',
        sort: {
          name: '',
          state: sortState
        } as ITableSort
      }
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(resultSort => {
        if (resultSort) {
          this.reportSortsComponent.saveSort(resultSort);
        }
      });
  }

  private resetAllSorts(): void {
    if (!this.isTableLoaded) {
      this.snackbar.openSnackbar(new TgSnackbarDanger('Please generate table first'));

      return;
    }

    this.reportTableComponent.applySort([]);
  }

  private onSortChanged(): void {
    if (!this.sortApplied) {
      this.reportSortsComponent.resetSelectedSort();
    } else {
      this.sortApplied = false;
    }
  }

  private exportAsCSV(): void {
    if (!this.isTableLoaded) {
      this.snackbar.openSnackbar(new TgSnackbarDanger('Please generate table first'));

      return;
    }

    this.reportTableComponent.exportAsCSV();
  }
}
