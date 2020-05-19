import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { mainPageTexts } from './main-page.texts';
import { TableID } from '@core/interfaces/structure.interfaces';

export interface ITableMainInfo {
  name: string;
  tableID: TableID;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, OnDestroy {
  public texts = mainPageTexts;
  public reportTables: ITableMainInfo[] = [
    {
      name: 'Жизненный цикл задач',
      tableID: TableID.LIFECYCLE
    },
    {
      name: 'Динамика выполнения задач',
      tableID: TableID.DYNAMIC
    },
    {
      name: 'Оценка общего затраченного времени',
      tableID: TableID.TIME_SPENT
    }
  ];

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public getTableLink(table: ITableMainInfo): string {
    return `/tables/${table.tableID}`;
  }
}
