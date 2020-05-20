import { BehaviorSubject } from 'rxjs';

export abstract class ChartComponentBase {
  public view: any[] = [undefined, 500];
  public legend$ = new BehaviorSubject<boolean>(false);
  public animations = true;
  public xAxis = true;
  public yAxis = true;
  public showYAxisLabel = true;
  public showXAxisLabel = true;
  public timeline = false;
  public legendPosition = 'below';
  public colorScheme = {
    domain: ['#0052CC', '#FF5630', '#36B37E', '#FFAB00', '#00B8D9']
  };
  public height = 500;
  public legendTitle = '';
  public abstract width;
  public abstract xAxisLabel: string;
  public abstract yAxisLabel: string;
}
