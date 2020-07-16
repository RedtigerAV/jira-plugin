import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { IActionItem } from '../../shared/actions-panel/actions-panel.component';
import { BehaviorSubject } from 'rxjs';
import { LoadingStateEnum } from '@core/interfaces/loading-state.interface';
import { ILinearChartData } from '../interfaces/chart-data.interfaces';
import { DefaultSettingsService } from '@core/services/default-settings.service';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { ChartComponentBase } from '../chart-component.base';
import { ILinearChartContext } from './contexts/context.interface';
import { ActivatedRoute } from '@angular/router';
import { DefaultSettingsMiddleware } from '@core/services/default-settings.middleware';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';
import { TgSnackbarDanger } from '@shared/components/tg-snackbar/models/tg-snackbar.models';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DefaultSettingsMiddleware]
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
  public chartState$ = new BehaviorSubject<LoadingStateEnum>(LoadingStateEnum.NOT_LOADED);
  public chartStateEnum = LoadingStateEnum;
  public chartData$: BehaviorSubject<ILinearChartData[]>;
  public context: ILinearChartContext;

  constructor(private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef,
              private readonly defaultSettingsMiddleware: DefaultSettingsMiddleware,
              private readonly defaultSettingsService: DefaultSettingsService,
              private readonly snackbar: TgSnackbarService,
              private readonly activatedRoute: ActivatedRoute) {
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
        this.form = this.context.settingsBuilder.getSettingsFormGroup(settings);
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
    this.defaultSettingsMiddleware.applyDefaultSettings(this.context.chartID, this.form, this.cdr);
  }

  public saveSettingsAsDefault(): void {
    this.defaultSettingsMiddleware.saveSettingsAsDefault(this.context.chartID, this.form);
  }

  public onSettings(): void {
    this.defaultSettingsMiddleware.openSettingsModalHandler(this.context.chartID, this.context.settingsBuilder);
  }

  private generateChart(): void {
    if (this.form.invalid) {
      this.snackbar.openSnackbar(new TgSnackbarDanger('Заполните необходимые поля'));

      markFormGroupTouched(this.form);

      return;
    }

    this.chartState$.next(LoadingStateEnum.LOADING);

    this.context.getData(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this))
      .subscribe(data => {
        this.chartData$.next(data);
        this.chartState$.next(LoadingStateEnum.LOADED);
        this.cdr.detectChanges();
        this.legend$.next(true);
      });
  }
}
