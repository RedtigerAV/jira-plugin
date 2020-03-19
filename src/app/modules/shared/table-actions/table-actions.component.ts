import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableActionsComponent implements OnInit {
  @Output() generateTable = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
