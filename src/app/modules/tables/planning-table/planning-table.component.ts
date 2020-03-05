import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableMainInfo } from '@core/interfaces/table-main-info.interface';
import { tablesMainInfo } from '@core/static/tables-main-info.const';
import { RecordTableTypesEnum } from '@core/enums/tables.enum';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanningTableComponent implements OnInit {
  public mainInfo: TableMainInfo = tablesMainInfo
    .find(({type}) => type === RecordTableTypesEnum.PLANNING);

  constructor() { }

  ngOnInit(): void {
  }

  public onSettings(): void {
    console.log('OnSettings');
  }
}
