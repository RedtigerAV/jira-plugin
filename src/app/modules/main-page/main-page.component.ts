import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { mainPageTexts } from './main-page.texts';
import { reportsTableMainInfo } from '@core/static/tables-main-info.const';
import { ITableMainInfo, TableID, TableTypeEnum } from '@core/interfaces/table-main-info.interface';
import { ReportDefaultSettingsService } from '@core/services/report-default-settings.service';
import { MatDialog } from '@angular/material';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { switchMap, take } from 'rxjs/operators';
import { IReportSettingsBuilder } from '@core/interfaces/report-settings-builder.interfaces';
import { FormBuilder } from '@ng-stack/forms';
import { LifecycleReportSettingsBuilder } from '../tables/report/report-settings-builders/lifecycle-report-settings.builder';
import { TableSettingsModalComponent } from '../shared/table-settings/table-settings-modal/table-settings-modal.component';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, OnDestroy {
  public texts = mainPageTexts;
  public reportTables = reportsTableMainInfo;

  constructor(private readonly reportDefaultSettings: ReportDefaultSettingsService,
              private readonly dialog: MatDialog,
              private readonly fb: FormBuilder) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public openReportTableSettings(event: MouseEvent, table: ITableMainInfo): void {
    event.stopPropagation();

    this.reportDefaultSettings.getReportDefaultSettings(table.tableID)
      .pipe(
        switchMap(settings => {
          const settingsBuilder = this.getSettingsBuilderByTableID(table.tableID);
          const dialogRef = this.dialog.open(TableSettingsModalComponent, {
            data: {
              title: `Default settings for ${table.name}`,
              settings,
              settingsBuilder
            }
          });

          return dialogRef.afterClosed().pipe(take(1))
        }),
        switchMap(defaultSettings => defaultSettings
          ? this.reportDefaultSettings.setReportDefaultSettings(table.tableID, defaultSettings)
          : EMPTY
        ),
        takeUntilDestroyed(this)
      )
      .subscribe();
  }

  public getTableLink(table: ITableMainInfo): string {
    if (table.type === TableTypeEnum.REPORT) {
      return `/tables/report/${table.tableID}`;
    } else if (table.type === TableTypeEnum.RECORD) {
      return `/tables/record/${table.tableID}`;
    }
  }

  private getSettingsBuilderByTableID(tableID: TableID): IReportSettingsBuilder {
    switch (tableID) {
      case TableID.LIFECYCLE:
        return new LifecycleReportSettingsBuilder(this.fb);
      default:
        return null;
    }
  }
}
