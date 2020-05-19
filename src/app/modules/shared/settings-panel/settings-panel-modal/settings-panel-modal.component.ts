import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ISettingsPanelForm } from '@core/interfaces/settings-panel-form.interfaces';
import { ISettingsPanelFormBuilder } from '@core/interfaces/settings-panel-form-builder.interfaces';
import { FormGroup } from '@ng-stack/forms';

export interface ISettingsPanelModalData {
  title: string;
  settings: ISettingsPanelForm;
  settingsBuilder: ISettingsPanelFormBuilder;
}

@Component({
  selector: 'app-settings-panel-modal',
  templateUrl: './settings-panel-modal.component.html',
  styleUrls: ['./settings-panel-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPanelModalComponent {
  form: FormGroup<ISettingsPanelForm>;

  constructor(public dialogRef: MatDialogRef<SettingsPanelModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ISettingsPanelModalData) {
    this.form = this.data.settingsBuilder.getSettingsFromGroup(this.data.settings);
  }

  onSave(): void {
    this.dialogRef.close(this.form.getRawValue());
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
