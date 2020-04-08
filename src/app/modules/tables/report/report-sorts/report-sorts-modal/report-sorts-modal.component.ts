import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@ng-stack/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Validators } from '@angular/forms';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';
import { ITableSort } from '@core/interfaces/table-sort.interfaces';

export interface IReportSortModalData {
  title: string;
  sort: ITableSort
}

@Component({
  selector: 'app-report-sorts-modal',
  templateUrl: './report-sorts-modal.component.html',
  styleUrls: ['./report-sorts-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportSortsModalComponent implements OnInit {
  public form: FormGroup<{name: string}>;

  constructor(
    public dialogRef: MatDialogRef<ReportSortsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReportSortModalData,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group<{name: string}>({
      name: [this.data.sort.name, Validators.required]
    })
  }

  onSave(): void {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);

      return;
    }

    const sort = this.data.sort;

    sort.name = this.form.value.name;

    this.dialogRef.close(sort);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
