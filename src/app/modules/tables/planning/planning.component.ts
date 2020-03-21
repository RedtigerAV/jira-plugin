import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableMainInfo } from '@core/interfaces/table-main-info.interface';
import { tablesMainInfo } from '@core/static/tables-main-info.const';
import { RecordTableTypesEnum } from '@core/enums/tables.enum';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanningComponent implements OnInit {
  public mainInfo: TableMainInfo = tablesMainInfo
    .find(({type}) => type === RecordTableTypesEnum.PLANNING);

  constructor() { }

  ngOnInit(): void {
  }

  public onSettings(): void {
    console.log('OnSettings');
  }
}
