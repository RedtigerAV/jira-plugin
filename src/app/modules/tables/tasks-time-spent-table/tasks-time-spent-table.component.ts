import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tasks-time-spent-table',
  templateUrl: './tasks-time-spent-table.component.html',
  styleUrls: ['./tasks-time-spent-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTimeSpentTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
