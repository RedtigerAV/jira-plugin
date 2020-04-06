import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder } from '@ng-stack/forms';
import { IReportContext } from './interfaces/report-context.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements OnInit, OnDestroy {
  public readonly context: IReportContext;

  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute) {
    this.context = this.activatedRoute.snapshot.data.context;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {}

  public onSettings(): void {
    console.log('OnSettings');
  }
}
