import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ITableColumnFilter, ITableFilter } from '@core/interfaces/table-filter.interfaces';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { Validators } from '@angular/forms';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';

export interface IReportFilterModalData {
  title: string;
  filter: ITableFilter
}

@Component({
  selector: 'app-report-filter-modal',
  templateUrl: './report-filter-modal.component.html',
  styleUrls: ['./report-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFilterModalComponent implements OnInit {
  public form: FormGroup<{name: string}>;

  constructor(
    public dialogRef: MatDialogRef<ReportFilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReportFilterModalData,
    private readonly fb: FormBuilder
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

    this.dialogRef.close(filter);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getColumnsFilters(filter: ITableFilter): ITableColumnFilter[] {
    return Object.keys(filter.state).map(field => filter.state[field]);
  }

  getFilterNameByType(type: string): string {
    switch (type) {
      case 'equals':
        return 'Equals';
      case 'notEqual':
        return 'Not equal';
      case 'lessThan':
        return 'Less than';
      case 'lessThanOrEqual':
        return 'Less than or equal';
      case 'greaterThan':
        return 'Greater than';
      case 'greaterThanOrEqual':
        return 'Greater than or equal';
      case 'inRange':
        return 'In range';
      case 'contains':
        return 'Contains';
      case 'notContains':
        return 'Not contains';
      case 'startsWith':
        return 'Starts with';
      case 'endsWith':
        return 'Ends with';
    }
  }
}
