import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableMainInfo } from '@core/interfaces/table-main-info.interface';
import { tablesMainInfo } from '@core/static/tables-main-info.const';
import { ReportTableTypesEnum } from '@core/enums/tables.enum';

@Component({
  selector: 'app-tasks-time-spent-table',
  templateUrl: './tasks-time-spent-table.component.html',
  styleUrls: ['./tasks-time-spent-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTimeSpentTableComponent implements OnInit {
  public mainInfo: TableMainInfo = tablesMainInfo
    .find(({type}) => type === ReportTableTypesEnum.TIME_SPENT);

  constructor() { }

  ngOnInit(): void {
  }

  public onSettings(): void {
    console.log('OnSettings');
  }
}
