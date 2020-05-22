import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { IActionItem } from '../../shared/actions-panel/actions-panel.component';
import { BehaviorSubject } from 'rxjs';
import { StructureStateEnum } from '@core/interfaces/structure-state.interface';
import { ILinearChartData } from '../interfaces/chart-data.interfaces';
import { SettingsPanelModalService } from '../../shared/settings-panel/settings-panel-modal/settings-panel-modal.service';
import { DefaultSettingsService } from '@core/services/default-settings.service';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { TgSnackbarSuccess } from '@shared/components/tg-snackbar/models/tg-snackbar.models';
import { ChartComponentBase } from '../chart-component.base';
import { ILinearChartContext } from './contexts/context.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinearChartComponent extends ChartComponentBase implements OnInit, AfterViewInit, OnDestroy {
  public width = undefined;
  public form: FormGroup<ISettingsPanelForm>;
  public xAxisLabel: string;
  public yAxisLabel: string;
  public actions: IActionItem[] = [
    {
      title: 'Рассчитать показатель',
      action: (() => {
        this.generateChart();
      }).bind(this)
    },
    {
      title: 'Применить настройки по умолчанию',
      action: (() => {
        this.applyDefaultSettings();
      }).bind(this)
    },
    {
      title: 'Обновить настройки по умолчанию',
      action: (() => {
        this.saveSettingsAsDefault();
      }).bind(this)
    }
  ];
  public chartState$ = new BehaviorSubject<StructureStateEnum>(StructureStateEnum.NOT_LOADED);
  public chartStateEnum = StructureStateEnum;
  public chartData$: BehaviorSubject<ILinearChartData[]>;
  public context: ILinearChartContext;

  constructor(private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef,
              private readonly settingsPanelModalService: SettingsPanelModalService,
              private readonly defaultSettingsService: DefaultSettingsService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly snackbar: TgSnackbarService) {
    super();
    this.context = this.activatedRoute.snapshot.data.context;
    this.xAxisLabel = this.context.xAxisLabel;
    this.yAxisLabel = this.context.yAxisLabel;
    this.chartData$ = new BehaviorSubject<ILinearChartData[]>([]);
  }

  ngOnInit(): void {
    this.defaultSettingsService.getDefaultSettings(this.context.chartID)
      .pipe(takeUntilDestroyed(this))
      .subscribe((settings: ISettingsPanelForm) => {
        this.form = this.context.settingsBuilder.getSettingsFromGroup(settings);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.context.destroy();
  }

  ngAfterViewInit(): void {
    this.width = document.querySelector('.chart-wrapper').getBoundingClientRect().width;
  }

  public applyDefaultSettings(): void {
    this.defaultSettingsService.getDefaultSettings(this.context.chartID)
      .pipe(takeUntilDestroyed(this))
      .subscribe((settings: ISettingsPanelForm) => {
        this.form.patchValue(settings);
        this.cdr.detectChanges();
      });
  }

  public saveSettingsAsDefault(): void {
    this.defaultSettingsService.setDefaultSettings(this.context.chartID, this.form.getRawValue())
      .pipe(takeUntilDestroyed(this))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess('Настройки по умолчанию сохранены!'))
      });
  }

  public onSettings(): void {
    this.settingsPanelModalService.openDefaultSettingsPanelModel(this.context.chartID, this.context.settingsBuilder)
      .pipe(takeUntilDestroyed(this))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess('Настройки по умолчанию сохранены!'))
      });
  }

  private generateChart(): void {
    this.chartState$.next(StructureStateEnum.LOADING);

    this.context.getData(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this))
      .subscribe(data => {
        this.chartData$.next(data);
        this.chartState$.next(StructureStateEnum.LOADED);
        this.cdr.detectChanges();
        this.legend$.next(true);
      });
  }
}
