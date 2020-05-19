import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { IPlanningSettings } from '@core/interfaces/planning.interfaces';
import { Validators } from '@angular/forms';
import { ProjectsDataSource } from '@core/datasources/projects.datasource';
import { BoardsDataSource } from '@core/datasources/boards.datasource';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { ProjectsService } from '@core/api/platform/api/projects.service';
import { BoardsService } from '@core/api/software/api/boards.service';
import { ColumnApi, DetailGridInfo, GridApi } from 'ag-grid-community';
import { ITableColumn, ITableDefaultColumn } from '../interfaces/table-column.interfaces';
import { planning } from '../services/planning.service';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanningComponent implements OnInit, OnDestroy {
  form: FormGroup<IPlanningSettings>;
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

  public projectsDataSource: ProjectsDataSource;
  public boardsDataSource: BoardsDataSource;

  public unset = new BehaviorSubject(true);
  public loader = new BehaviorSubject(false);
  public loaded = new BehaviorSubject(false);

  private currentProject$: BehaviorSubject<string>;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(private readonly fb: FormBuilder,
              private readonly projectService: ProjectsService,
              private readonly boardsService: BoardsService) { }

  ngOnInit(): void {
    this.currentProject$ = new BehaviorSubject<string>(undefined);

    this.form = this.fb.group<IPlanningSettings>({
      project: ['', Validators.required],
      projectPreview: [],
      board: ['', Validators.required],
      boardPreview: [],
    });

    this.initSubscriptions();
    this.initDataSources();
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

  private initDataSources(): void {
    this.projectsDataSource = new ProjectsDataSource(this.projectService);
    this.boardsDataSource = new BoardsDataSource(this.currentProject$, this.boardsService);
  }

  private initSubscriptions(): void {
    this.form.controls.project.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this)
      )
      .subscribe(value => {
        this.currentProject$.next(value);
      });
  }
}
