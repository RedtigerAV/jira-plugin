import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ColumnApi, DetailGridInfo, GridApi } from 'ag-grid-community';
import { ITableColumn, ITableDefaultColumn } from '../interfaces/table-column.interfaces';
import { IActionItem } from '../../shared/actions-panel/actions-panel.component';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { StructureStateEnum } from '@core/interfaces/structure-state.interface';
import { switchMap, take, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { PlanningService } from './planning.service';
import { PlanningSettingsBuilder } from './planning-settings.builder';
import { DefaultSettingsService } from '@core/services/default-settings.service';
import { TableID } from '@core/interfaces/structure.interfaces';
import { TgSnackbarSuccess } from '@shared/components/tg-snackbar/models/tg-snackbar.models';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';
import { SettingsPanelModalService } from '../../shared/settings-panel/settings-panel-modal/settings-panel-modal.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlanningService]
})
export class PlanningComponent implements OnInit, OnDestroy {
  public form: FormGroup<ISettingsPanelForm>;
  public hiddenControls: BooleanFormState<ISettingsPanelForm>;
  public actions: IActionItem[] = [
    {
      title: 'Начать планирование',
      action: (() => {
        this.generateTable();
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
  public columnDefs$: ReplaySubject<ITableColumn[]>;
  public defaultColDef$: ReplaySubject<ITableDefaultColumn>;
  public rowData$: ReplaySubject<any[]>;
  public tableState$ = new BehaviorSubject<StructureStateEnum>(StructureStateEnum.NOT_LOADED);
  public tableStateEnum = StructureStateEnum;
  public settingsBuilder: PlanningSettingsBuilder;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private tableID = TableID.PLANNING;

  constructor(private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef,
              private readonly settingsPanelModalService: SettingsPanelModalService,
              private readonly defaultSettingsService: DefaultSettingsService,
              private readonly snackbar: TgSnackbarService,
              private readonly planningService: PlanningService) {
    this.rowData$ = new ReplaySubject<any[]>(1);
    this.columnDefs$ = new ReplaySubject<any[]>(1);
    this.defaultColDef$ = new ReplaySubject<any>(1);
    this.settingsBuilder = new PlanningSettingsBuilder(this.fb);
    this.hiddenControls = this.settingsBuilder.hiddenControls;
  }

  ngOnInit(): void {
    this.defaultSettingsService.getDefaultSettings(this.tableID)
      .pipe(takeUntilDestroyed(this))
      .subscribe((settings: ISettingsPanelForm) => {
        this.form = this.settingsBuilder.getSettingsFromGroup(settings);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.settingsBuilder.destroy();
  }

  public onCellEditingStop(): void {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));

    this.planningService.updateTableData(this.form.value.board, rowData)
      .pipe(take(1))
      .subscribe();
  }

  public onGridReady(params: DetailGridInfo): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  public applyDefaultSettings(): void {
    this.defaultSettingsService.getDefaultSettings(this.tableID)
      .pipe(takeUntilDestroyed(this))
      .subscribe((settings: ISettingsPanelForm) => {
        this.form.patchValue(settings);
        this.cdr.detectChanges();
      });
  }

  public saveSettingsAsDefault(): void {
    this.defaultSettingsService.setDefaultSettings(this.tableID, this.form.getRawValue())
      .pipe(takeUntilDestroyed(this))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess('Настройки по умолчанию сохранены!'))
      });
  }

  public onSettings(): void {
    this.settingsPanelModalService.openDefaultSettingsPanelModel(this.tableID, this.settingsBuilder)
      .pipe(takeUntilDestroyed(this))
      .subscribe(() => {
        this.snackbar.openSnackbar(new TgSnackbarSuccess('Настройки по умолчанию сохранены!'))
      });
  }

  private generateTable(): void {
    this.tableState$.next(StructureStateEnum.LOADING);
    this.defaultColDef$.next(this.planningService.defaultColumnsDef);

    this.planningService.getColumnsDef(this.form.getRawValue())
      .pipe(
        tap(columnsRef => {
          this.columnDefs$.next(columnsRef);
        }),
        switchMap(() => this.planningService.getTableData(this.form.getRawValue())),
        takeUntilDestroyed(this)
      )
      .subscribe(data => {
        this.rowData$.next(data);
        this.tableState$.next(StructureStateEnum.LOADED);
        this.cdr.detectChanges();
      });
  }
}
