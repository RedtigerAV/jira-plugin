import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { IReportContext } from './interfaces/report-context.interfaces';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { SettingsPanelModalService } from '../../shared/settings-panel/settings-panel-modal/settings-panel-modal.service';
import { TgSnackbarSuccess } from '@shared/components/tg-snackbar/models/tg-snackbar.models';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements OnInit, OnDestroy {
  public readonly context: IReportContext;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly snackbar: TgSnackbarService,
              private readonly settingsPanelModalService: SettingsPanelModalService) {
    this.context = this.activatedRoute.snapshot.data.context;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.context.destroy();
  }

  public onSettings(): void {
    this.settingsPanelModalService.openDefaultSettingsPanelModel(this.context.tableID, this.context.settingsBuilder)
      .pipe(takeUntilDestroyed(this))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess('Настройки по умолчанию сохранены!'))
      });
  }
}
