import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { tablesMainInfo } from '@core/static/tables-main-info.const';
import { ReportTableTypesEnum } from '@core/enums/tables.enum';
import { TableMainInfo } from '@core/interfaces/table-main-info.interface';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { ITableSettingsForm, TableSettingsPeriodTypesEnum } from '../../shared/table-settings/interfaces/table-settings-form.interface';
import { Validators } from '@angular/forms';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';
import { distinctUntilChanged, finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { HttpClient } from '@angular/common/http';
import { AuditRecordsService } from '@core/api/platform/api/auditRecords.service';

export enum LoadTableStateEnum {
  NOT_LOADED = 'not-loaded',
  LOADING = 'loading',
  LOADED = 'loaded'
}

@Component({
  selector: 'app-task-lifecycle-table',
  templateUrl: './tasks-lifecycle-table.component.html',
  styleUrls: ['./tasks-lifecycle-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksLifecycleTableComponent implements OnInit, OnDestroy {
  public form: FormGroup<ITableSettingsForm>;
  public mainInfo: TableMainInfo = tablesMainInfo
    .find(({type}) => type === ReportTableTypesEnum.LIFECYCLE);
  public loadTableState$ = new BehaviorSubject<LoadTableStateEnum>(LoadTableStateEnum.NOT_LOADED);
  public loadTableStateEnum = LoadTableStateEnum;

  constructor(private readonly fb: FormBuilder,
              private readonly http: HttpClient,
              private readonly auditRecordsService: AuditRecordsService) {
    this.form = this.fb.group<ITableSettingsForm>({
      project: ['', Validators.required],
      board: ['', Validators.required],
      periodType: [TableSettingsPeriodTypesEnum.DATE],
      sprint: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.controls.periodType.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this)
      )
      .subscribe(value => {
        if (value === TableSettingsPeriodTypesEnum.DATE) {
          this.form.controls.sprint.clearValidators();
          this.form.controls.startDate.setValidators(Validators.required);
          this.form.controls.endDate.setValidators(Validators.required);
        } else {
          this.form.controls.sprint.setValidators(Validators.required);
          this.form.controls.startDate.clearValidators();
          this.form.controls.endDate.clearValidators();
        }
      });
  }

  ngOnDestroy(): void {}

  public onSettings(): void {
    console.log('OnSettings');
  }

  public onGenerate(): void {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);

      return;
    }

    this.loadTableState$.next(LoadTableStateEnum.LOADING);

    forkJoin(
      this.auditRecordsService.getAuditRecords(),
      this.http.get('https://timgo.atlassian.net/rest/agile/1.0/board')
    )
      .pipe(
        takeUntilDestroyed(this)
      )
      .subscribe(value => {
        this.loadTableState$.next(LoadTableStateEnum.LOADED);

        console.log(value);
      });
  }
}
