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

@Injectable()
export class ReportMediator implements OnDestroy, IReportMediator {
  reportActionsComponent: any;
  reportFiltersComponent: IReportFiltersComponent;
  reportSettingsComponent: IReportSettingsComponent;
  reportSortsComponent: IReportSortsComponent;
  reportTableComponent: IReportTableComponent;

  private filterApplied = false;

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

  private exportAsCSV(): void {
    this.reportTableComponent.exportAsCSV();
  }
}
