import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { IReportSettingsBuilder } from '@core/interfaces/report-settings-builder.interfaces';
import { FormGroup } from '@ng-stack/forms';

export interface ITableSettingsModalData {
  title: string;
  settings: IReportSettings;
  settingsBuilder: IReportSettingsBuilder;
}

@Component({
  selector: 'app-table-settings-modal',
  templateUrl: './table-settings-modal.component.html',
  styleUrls: ['./table-settings-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSettingsModalComponent implements OnInit {
  form: FormGroup<IReportSettings>;

  constructor(public dialogRef: MatDialogRef<TableSettingsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ITableSettingsModalData) { }

  ngOnInit(): void {
    this.form = this.data.settingsBuilder.getSettingsFromGroup(this.data.settings);
  }

  onSave(): void {
    this.dialogRef.close(this.form.getRawValue());
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
