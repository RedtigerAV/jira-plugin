import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ChartID } from '@core/interfaces/structure.interfaces';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';
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
import { PlanFactService } from './plan-fact.service';
import { PlanFactSettingsBuilder } from './plan-fact-settings.builder';

@Component({
  selector: 'app-plan-fact',
  templateUrl: './plan-fact.component.html',
  styleUrls: ['./plan-fact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanFactComponent extends ChartComponentBase implements OnInit, AfterViewInit, OnDestroy {
  public chartID = ChartID.PLAN_FACT;
  public width = undefined;
  public form: FormGroup<ISettingsPanelForm>;
  public hiddenControls: BooleanFormState<ISettingsPanelForm>;
  public xAxisLabel = 'Спринты';
  public yAxisLabel = 'Часы';
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
  public settingsBuilder: PlanFactSettingsBuilder;
  public chartData$: BehaviorSubject<ILinearChartData[]>;

  constructor(private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef,
              private readonly settingsPanelModalService: SettingsPanelModalService,
              private readonly defaultSettingsService: DefaultSettingsService,
              private readonly planFactService: PlanFactService,
              private readonly snackbar: TgSnackbarService) {
    super();
    this.settingsBuilder = new PlanFactSettingsBuilder(this.fb);
    this.hiddenControls = this.settingsBuilder.hiddenControls;
    this.chartData$ = new BehaviorSubject<ILinearChartData[]>([]);
  }

  ngOnInit(): void {
    this.defaultSettingsService.getDefaultSettings(this.chartID)
      .pipe(takeUntilDestroyed(this))
      .subscribe((settings: ISettingsPanelForm) => {
        this.form = this.settingsBuilder.getSettingsFromGroup(settings);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.settingsBuilder.destroy();
  }

  ngAfterViewInit(): void {
    this.width = document.querySelector('.chart-wrapper').getBoundingClientRect().width;
  }

  public applyDefaultSettings(): void {
    this.defaultSettingsService.getDefaultSettings(this.chartID)
      .pipe(takeUntilDestroyed(this))
      .subscribe((settings: ISettingsPanelForm) => {
        this.form.patchValue(settings);
        this.cdr.detectChanges();
      });
  }

  public saveSettingsAsDefault(): void {
    this.defaultSettingsService.setDefaultSettings(this.chartID, this.form.getRawValue())
      .pipe(takeUntilDestroyed(this))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess('Настройки по умолчанию сохранены!'))
      });
  }

  public onSettings(): void {
    this.settingsPanelModalService.openDefaultSettingsPanelModel(this.chartID, this.settingsBuilder)
      .pipe(takeUntilDestroyed(this))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess('Настройки по умолчанию сохранены!'))
      });
  }

  private generateChart(): void {
    this.chartState$.next(StructureStateEnum.LOADING);

    this.planFactService.getData(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this))
      .subscribe(data => {
        this.chartData$.next(data);
        this.chartState$.next(StructureStateEnum.LOADED);
        this.cdr.detectChanges();
        this.legend$.next(true);
      });
  }
}
