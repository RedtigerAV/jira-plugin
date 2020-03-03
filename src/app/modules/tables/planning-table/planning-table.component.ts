import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanningTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
