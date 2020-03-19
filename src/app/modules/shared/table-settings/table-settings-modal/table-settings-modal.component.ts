import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table-settings-modal',
  templateUrl: './table-settings-modal.component.html',
  styleUrls: ['./table-settings-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSettingsModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
