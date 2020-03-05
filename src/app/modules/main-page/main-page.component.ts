import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { mainPageTexts } from './main-page.texts';
import { reportsTableMainInfo } from '@core/static/tables-main-info.const';
import { TableType } from '@core/enums/tables.enum';

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

  public openSettings(event: MouseEvent, tableType: TableType): void {
    event.stopPropagation();

    console.log('OnSettings: ', tableType);
  }
}
