import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ITableSettingsForm, TableSettingsPeriodTypesEnum } from './interfaces/table-settings-form.interface';
import { FormGroup } from '@ng-stack/forms';
import { ProjectsDataSource } from '@core/datasources/projects.datasource';
import { SprintsDataSource } from '@core/datasources/sprints.datasource';
import { PeriodTypeDataSource } from '@core/datasources/period-type.datasource';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { BoardsDataSource } from '@core/datasources/boards.datasource';
import { ProjectsService } from '@core/api/platform/api/projects.service';
import { HttpClient } from '@angular/common/http';
import { BoardsService } from '@core/api/software/api/boards.service';
import { SprintsService } from '@core/api/software/api/sprints.service';

@Component({
  selector: 'app-table-settings',
  templateUrl: './table-settings.component.html',
  styleUrls: ['./table-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSettingsComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup<ITableSettingsForm>;
  @Input() controlsDisplay: 'row' | 'column';

  public projectsDataSource: ProjectsDataSource;
  public sprintDataSource: SprintsDataSource;
  public periodTypeDataSource: PeriodTypeDataSource;
  public boardsDataSource: BoardsDataSource;

  public periodTypeEnum = TableSettingsPeriodTypesEnum;

  private currentProject$: BehaviorSubject<string>;
  private currentBoard$: BehaviorSubject<string>;

  constructor(private readonly projectService: ProjectsService,
              private readonly boardsService: BoardsService,
              private readonly sprintsService: SprintsService) {
  }

  ngOnInit(): void {
    this.initSubscriptions();
    this.initDataSources();
  }

  ngOnDestroy(): void {}

  public get periodType$(): Observable<TableSettingsPeriodTypesEnum> {
    return this.form.controls.periodType.valueChanges
      .pipe(startWith(this.form.controls.periodType.value));
  }

  private initDataSources(): void {
    this.projectsDataSource = new ProjectsDataSource(this.projectService);
    this.boardsDataSource = new BoardsDataSource(this.currentProject$, this.boardsService);
    this.sprintDataSource = new SprintsDataSource(this.currentBoard$, this.sprintsService);
    this.periodTypeDataSource = new PeriodTypeDataSource();
  }

  private initSubscriptions(): void {
    this.form.valueChanges.subscribe(x => console.log(x));

    this.currentProject$ = new BehaviorSubject<string>(this.form.controls.project.value);
    this.currentBoard$ = new BehaviorSubject<string>(this.form.controls.board.value);

    this.form.controls.project.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this)
      )
      .subscribe(value => {
        this.currentProject$.next(value);
        this.form.controls.board.reset();
      });

    this.form.controls.board.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this)
      )
      .subscribe(value => {
        this.currentBoard$.next(value);
        this.form.controls.sprint.reset();
      });
  }
}
