import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { mainPageTexts } from './main-page.texts';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  public texts = mainPageTexts;

  constructor() { }

  ngOnInit() {
  }

}
