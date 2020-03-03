import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-task-lifecycle-table',
  templateUrl: './tasks-lifecycle-table.component.html',
  styleUrls: ['./tasks-lifecycle-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksLifecycleTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
