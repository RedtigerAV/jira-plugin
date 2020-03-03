import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tasks-dynamic-table',
  templateUrl: './tasks-dynamic-table.component.html',
  styleUrls: ['./tasks-dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksDynamicTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
