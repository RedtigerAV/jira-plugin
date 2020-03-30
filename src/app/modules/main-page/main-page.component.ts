import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { mainPageTexts } from './main-page.texts';
import { reportsTableMainInfo } from '@core/static/tables-main-info.const';
import { ITableMainInfo, TableTypeEnum } from '@core/interfaces/table-main-info.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  public texts = mainPageTexts;
  public reportTables = reportsTableMainInfo;

  constructor() { }

  ngOnInit(): void {
  }

  public openSettings(event: MouseEvent): void {
    event.stopPropagation();

    console.log('OnSettings: ');
  }

  public getTableLink(table: ITableMainInfo): string {
    if (table.type === TableTypeEnum.REPORT) {
      return `/tables/report/${table.tableID}`;
    } else if (table.type === TableTypeEnum.RECORD) {
      return `/tables/record/${table.tableID}`;
    }
  }
}
