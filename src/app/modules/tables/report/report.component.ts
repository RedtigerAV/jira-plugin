import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { ITableSettingsForm, TableSettingsPeriodTypesEnum } from '../../shared/table-settings/interfaces/table-settings-form.interface';
import { Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { IReportContext } from './interfaces/report-context.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements OnInit, OnDestroy {
  public form: FormGroup<ITableSettingsForm>;

  public readonly context: IReportContext;

  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute) {
    this.form = this.fb.group<ITableSettingsForm>({
      project: ['', Validators.required],
      board: ['', Validators.required],
      periodType: [TableSettingsPeriodTypesEnum.DATE],
      sprint: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.context = this.activatedRoute.snapshot.data.context;
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
}
