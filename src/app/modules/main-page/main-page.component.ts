import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { mainPageTexts } from './main-page.texts';
import { ChartID, ChartType, TableID } from '@core/interfaces/structure.interfaces';

export interface ITableMainInfo {
  name: string;
  description: string;
  tableID: TableID;
}
export interface IChartMainInfo {
  name: string;
  description: string;
  chartID: ChartID;
  chartType: ChartType;
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
      description: mainPageTexts[TableID.LIFECYCLE],
      tableID: TableID.LIFECYCLE
    },
    {
      name: 'Динамика выполнения задач',
      description: mainPageTexts[TableID.DYNAMIC],
      tableID: TableID.DYNAMIC
    },
    {
      name: 'Оценка общего затраченного времени',
      description: mainPageTexts[TableID.TIME_SPENT],
      tableID: TableID.TIME_SPENT
    }
  ];
  public charts: IChartMainInfo[] = [
    {
      name: 'Средняя производительность',
      description: mainPageTexts[ChartID.AVERAGE_PRODUCTIVITY],
      chartID: ChartID.AVERAGE_PRODUCTIVITY,
      chartType: ChartType.LINEAR
    },
    {
      name: 'План-факт',
      description: mainPageTexts[ChartID.PLAN_FACT],
      chartID: ChartID.PLAN_FACT,
      chartType: ChartType.LINEAR
    },
    {
      name: 'Незавершенная работа',
      description: mainPageTexts[ChartID.UNFINISHED_WORK],
      chartID: ChartID.UNFINISHED_WORK,
      chartType: ChartType.LINEAR
    },
    {
      name: 'Вес багов',
      description: mainPageTexts[ChartID.BUGS_WEIGHT],
      chartID: ChartID.BUGS_WEIGHT,
      chartType: ChartType.LINEAR
    }
  ];

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public getTableLink(table: ITableMainInfo): string {
    return `/tables/${table.tableID}`;
  }

  public getChartLink(chart: IChartMainInfo): string {
    return `/charts/${chart.chartType}/${chart.chartID}`;
  }
}
