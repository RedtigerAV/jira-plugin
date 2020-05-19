import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ColumnApi, DetailGridInfo, GridApi } from 'ag-grid-community';
import { ITableColumn, ITableDefaultColumn } from '../interfaces/table-column.interfaces';
import { planning } from '../services/planning.service';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';
import { IActionItem } from '../../shared/actions-panel/actions-panel.component';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanningComponent implements OnInit, OnDestroy {
  form: FormGroup<ISettingsPanelForm>;
  hiddenControls: BooleanFormState<ISettingsPanelForm> = {
    periodBy: true,
    startDate: true,
    endDate: true,
    fromSprint: true,
    fromSprintPreview: true,
    toSprint: true,
    toSprintPreview: true
  };
  actions: IActionItem[] = [
    {
      title: 'Начать планирование',
      action: () => {}
    },
    {
      title: 'Применить настройки по умолчанию',
      action: () => {}
    },
    {
      title: 'Обновить настройки по умолчанию',
      action: () => {}
    }
  ];
  columnDefs: ITableColumn[] = [
    {
      field: 'user',
      headerName: 'User'
    },
    {
      field: 'sprint1',
      headerName: 'Доска Спринт 1',
      editable: true
    },
    {
      field: 'sprint2',
      headerName: 'Доска Спринт 2',
      editable: true
    },
    {
      field: 'sprint3',
      headerName: 'Доска Спринт 3',
      editable: true
    }
  ];
  defaultColDef: ITableDefaultColumn = {
    flex: 1,
    minWidth: 150,
    minHeight: 100,
    resizable: true
  };
  rowData = [
    {
      user: 'Andrew',
      sprint1: planning['Andrew'].sprint1,
      sprint2: planning['Andrew'].sprint2,
      sprint3: planning['Andrew'].sprint3,
    },
    {
      user: 'Anton Vakhrushin',
      sprint1: planning['Anton Vakhrushin'].sprint1,
      sprint2: planning['Anton Vakhrushin'].sprint2,
      sprint3: planning['Anton Vakhrushin'].sprint3,
    },
    {
      user: 'Ekaterina',
      sprint1: planning['Ekaterina'].sprint1,
      sprint2: planning['Ekaterina'].sprint2,
      sprint3: planning['Ekaterina'].sprint3,
    },
  ];

  public unset = new BehaviorSubject(true);
  public loader = new BehaviorSubject(false);
  public loaded = new BehaviorSubject(false);

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group<ISettingsPanelForm>({
      project: ['', Validators.required],
      projectPreview: [],
      board: ['', Validators.required],
      boardPreview: [],
      group: ['', Validators.required],
      groupPreview: []
    });
  }

  ngOnDestroy(): void {}

  public onCellEditingStop({data}: any) {
    planning[data.user] = {
      sprint1: data.sprint1,
      sprint2: data.sprint2,
      sprint3: data.sprint3
    }
  }

  public planLabor(): void {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);

      return;
    }

    this.unset.next(false);
    this.loader.next(true);

    setTimeout(() => {
      this.loader.next(false);
      this.loaded.next(true);
    }, 2000);
  }

  public onGridReady(params: DetailGridInfo) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
