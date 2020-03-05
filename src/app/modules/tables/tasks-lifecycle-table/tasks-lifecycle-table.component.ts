import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tablesMainInfo } from '@core/static/tables-main-info.const';
import { ReportTableTypesEnum } from '@core/enums/tables.enum';
import { TableMainInfo } from '@core/interfaces/table-main-info.interface';

@Component({
  selector: 'app-task-lifecycle-table',
  templateUrl: './tasks-lifecycle-table.component.html',
  styleUrls: ['./tasks-lifecycle-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksLifecycleTableComponent implements OnInit {
  public mainInfo: TableMainInfo = tablesMainInfo
    .find(({type}) => type === ReportTableTypesEnum.LIFECYCLE);

  constructor() { }

  ngOnInit(): void {
  }

  public onSettings(): void {
    console.log('OnSettings');
  }
}
