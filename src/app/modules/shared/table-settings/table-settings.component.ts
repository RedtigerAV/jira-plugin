import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@ng-stack/forms';
import { ProjectsDataSource } from '@core/datasources/projects.datasource';
import { SprintsDataSource } from '@core/datasources/sprints.datasource';
import { PeriodTypeDataSource } from '@core/datasources/period-type.datasource';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { BoardsDataSource } from '@core/datasources/boards.datasource';
import { ProjectsService } from '@core/api/platform/api/projects.service';
import { BoardsService } from '@core/api/software/api/boards.service';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { IReportSettings, ReportPeriodTypesEnum } from '@core/interfaces/report-settings.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';

@Component({
  selector: 'app-table-settings',
  templateUrl: './table-settings.component.html',
  styleUrls: ['./table-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSettingsComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup<IReportSettings>;
  @Input() hiddenControls: BooleanFormState<IReportSettings>;
  @Input() controlsDisplay: 'row' | 'column';

  public projectsDataSource: ProjectsDataSource;
  public sprintDataSource: SprintsDataSource;
  public periodTypeDataSource: PeriodTypeDataSource;
  public boardsDataSource: BoardsDataSource;

  public periodTypeEnum = ReportPeriodTypesEnum;

  private currentProject$: BehaviorSubject<string>;
  private currentBoard$: BehaviorSubject<string>;

  constructor(private readonly projectService: ProjectsService,
              private readonly boardsService: BoardsService,
              private readonly sprintsService: SprintsService) {
  }

  ngOnInit(): void {
    this.currentProject$ = new BehaviorSubject<string>(this.form.value.project);
    this.currentBoard$ = new BehaviorSubject<string>(this.form.value.board);

    this.initSubscriptions();
    this.initDataSources();
  }

  ngOnDestroy(): void {}

  public get periodType$(): Observable<ReportPeriodTypesEnum> {
    return this.form.controls.periodBy.valueChanges
      .pipe(startWith(this.form.value.periodBy as any));
  }

  private initSubscriptions(): void {
    if (!this.hiddenControls.project) {
      this.form.controls.project.valueChanges
        .pipe(
          distinctUntilChanged(),
          takeUntilDestroyed(this)
        )
        .subscribe(value => {
          this.currentProject$.next(value);
        });
    }

    if (!this.hiddenControls.board) {
      this.form.controls.board.valueChanges
        .pipe(
          distinctUntilChanged(),
          takeUntilDestroyed(this)
        )
        .subscribe(value => {
          this.currentBoard$.next(value);
        });
    }
  }

  private initDataSources(): void {
    this.projectsDataSource = new ProjectsDataSource(this.projectService);
    this.boardsDataSource = new BoardsDataSource(this.currentProject$, this.boardsService);
    this.sprintDataSource = new SprintsDataSource(this.currentBoard$, this.sprintsService);
    this.periodTypeDataSource = new PeriodTypeDataSource();
  }
}
