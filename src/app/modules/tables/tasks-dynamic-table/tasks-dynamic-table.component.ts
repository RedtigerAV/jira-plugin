import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableMainInfo } from '@core/interfaces/table-main-info.interface';
import { tablesMainInfo } from '@core/static/tables-main-info.const';
import { ReportTableTypesEnum } from '@core/enums/tables.enum';

@Component({
  selector: 'app-tasks-dynamic-table',
  templateUrl: './tasks-dynamic-table.component.html',
  styleUrls: ['./tasks-dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksDynamicTableComponent implements OnInit {
  public mainInfo: TableMainInfo = tablesMainInfo
    .find(({type}) => type === ReportTableTypesEnum.DYNAMIC);

  constructor() { }

  ngOnInit(): void {
  }

  public onSettings(): void {
    console.log('OnSettings');
  }
}
