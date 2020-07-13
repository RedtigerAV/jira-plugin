import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@ng-stack/forms';
import { ProjectsDataSource } from '@core/datasources/projects.datasource';
import { SprintsDataSource } from '@core/datasources/sprints.datasource';
import { PeriodTypeDataSource } from '@core/datasources/period-type.datasource';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { BoardsDataSource } from '@core/datasources/boards.datasource';
import { ProjectsService } from '@core/api/platform/api/projects.service';
import { BoardsService } from '@core/api/software/api/boards.service';
import { SprintsService } from '@core/api/software/api/sprints.service';
import { ISettingsPanelForm, SettingsPanelPeriodTypesEnum } from '@core/interfaces/settings-panel-form.interfaces';
import { BooleanFormState } from '@shared/helpers/types.helper';
import { GroupsDataSource } from '@core/datasources/groups.datasource';
import { GroupsService } from '@core/api/platform/api/groups.service';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPanelComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup<ISettingsPanelForm>;
  @Input() displayedControls: BooleanFormState<ISettingsPanelForm>;
  @Input() controlsDisplay: 'row' | 'column';

  public projectsDataSource: ProjectsDataSource;
  public sprintDataSource: SprintsDataSource;
  public periodTypeDataSource: PeriodTypeDataSource;
  public boardsDataSource: BoardsDataSource;
  public groupsDataSource: GroupsDataSource;
  public periodTypeEnum = SettingsPanelPeriodTypesEnum;
  public periodType$: Observable<SettingsPanelPeriodTypesEnum>;

  public startDateFilter = ((date: Date) => {
    if (!this.form.value.endDate) {
      return true;
    }

    return date <= this.form.value.endDate;
  }).bind(this);

  public endDateFilter = ((date: Date) => {
    if (!this.form.value.startDate) {
      return true;
    }

    return date >= this.form.value.startDate;
  }).bind(this);

  constructor(private readonly projectService: ProjectsService,
              private readonly boardsService: BoardsService,
              private readonly groupsService: GroupsService,
              private readonly sprintsService: SprintsService) {
  }

  ngOnInit(): void {
    this.initDataSources();
    this.periodType$ = this.form.controls.periodBy.valueChanges
      .pipe(startWith(this.form.value.periodBy));
  }

  ngOnDestroy(): void {}

  private initDataSources(): void {
    this.projectsDataSource = new ProjectsDataSource(this.projectService);
    this.boardsDataSource = new BoardsDataSource(this.boardsService);
    this.sprintDataSource = new SprintsDataSource(this.sprintsService);
    this.groupsDataSource = new GroupsDataSource(this.groupsService);
    this.periodTypeDataSource = new PeriodTypeDataSource();

    if (this.displayedControls.project) {
      this.form.controls.project.valueChanges
        .pipe(
          startWith(this.form.controls.project.value),
          distinctUntilChanged(),
          debounceTime(0),
          takeUntilDestroyed(this)
        )
        .subscribe(value => {
          this.boardsDataSource.filterChanged(value && value.id);
        });
    }

    if (this.displayedControls.board) {
      this.form.controls.board.valueChanges
        .pipe(
          startWith(this.form.controls.board.value),
          distinctUntilChanged(),
          debounceTime(0),
          takeUntilDestroyed(this)
        )
        .subscribe(value => {
          this.sprintDataSource.filterChanged(value && value.id.toString());
        });
    }
  }
}
