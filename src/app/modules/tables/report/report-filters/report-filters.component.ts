import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
