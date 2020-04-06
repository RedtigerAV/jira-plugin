import { Injectable } from '@angular/core';
import { IReportMediator, ReportMediatorEventsEnum } from './interfaces/report-mediator.interfaces';
import { IReportFiltersComponent } from './interfaces/report-filters.interfaces';
import { IReportSettingsComponent } from './interfaces/report-settings.interfaces';
import { IReportSortsComponent } from './interfaces/report-sorts.interfaces';
import { IReportTableComponent } from './interfaces/report-table.interfaces';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';
import { TgSnackbarDanger } from '@shared/components/tg-snackbar/models/tg-snackbar.models';

@Injectable()
export class ReportMediator implements IReportMediator {
  reportActionsComponent: any;
  reportFiltersComponent: IReportFiltersComponent;
  reportSettingsComponent: IReportSettingsComponent;
  reportSortsComponent: IReportSortsComponent;
  reportTableComponent: IReportTableComponent;

  constructor(private readonly snackbar: TgSnackbarService) {
  }

  notify(event: ReportMediatorEventsEnum): void {
    switch (event) {
      case ReportMediatorEventsEnum.GENERATE_TABLE:
        this.generateTable();
        break;
      case ReportMediatorEventsEnum.EXPORT_AS_CSV:
        this.exportAsCSV();
        break;
      default:
        break;
    }
  }

  private generateTable(): void {
    if (this.reportSettingsComponent.form.invalid) {
      markFormGroupTouched(this.reportSettingsComponent.form);
      this.snackbar.openSnackbar(new TgSnackbarDanger('Please fill in all required fields'));

      return;
    }

    const settings = this.reportSettingsComponent.form.getRawValue();

    this.reportTableComponent.generateTable(settings);
  }

  private exportAsCSV(): void {
    this.reportTableComponent.exportAsCSV();
  }
}
