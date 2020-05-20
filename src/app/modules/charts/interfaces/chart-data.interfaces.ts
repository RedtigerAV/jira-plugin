export interface ILinearChartData {
  name: string;
  series: IChartSeries[];
}

export interface IChartSeries {
  name: string;
  value: number;
}
