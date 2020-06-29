import { Component, OnInit, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ITableColumnFilter, ITableFilter } from '../../../interfaces/table-filter.interfaces';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { Validators } from '@angular/forms';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';
import { durationFilters } from '../../../custom-filters/duration-filters';
import { numberFilters } from '../../../custom-filters/number-filters';
import { textFilters } from '../../../custom-filters/text-filters';
import { IFilterOptionDef } from 'ag-grid-community';

export interface IReportFilterModalData {
  title: string;
  filter: ITableFilter
}

@Component({
  selector: 'app-report-filter-modal',
  templateUrl: './report-filter-modal.component.html',
  styleUrls: ['./report-filter-modal.component.scss']
})
export class ReportFilterModalComponent implements OnInit {
  public form: FormGroup<{name: string}>;

  constructor(
    public dialogRef: MatDialogRef<ReportFilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReportFilterModalData,
    private readonly fb: FormBuilder,
    private readonly ngZone: NgZone
  ) {}

  ngOnInit() {
    this.form = this.fb.group<{name: string}>({
      name: [this.data.filter.name, Validators.required]
    })
  }

  onSave(): void {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);

      return;
    }

    const filter = this.data.filter;

    filter.name = this.form.value.name;

    this.ngZone.run(() => {
      this.dialogRef.close(filter);
    });
  }

  onClose(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

  getColumnsFilters(filter: ITableFilter): ITableColumnFilter[] {
    return Object.keys(filter.state).map(field => filter.state[field]);
  }

  getFilterNameByType(type: string): string {
    const allFilters: IFilterOptionDef[] = [
      ...durationFilters,
      ...numberFilters,
      ...textFilters
    ];

    return allFilters.find(option => option.displayKey === type).displayName;
  }
}
