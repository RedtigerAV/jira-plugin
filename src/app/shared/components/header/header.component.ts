import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() withBackButton = true;
  @Input() backButtonLink: string | string[];

  constructor() { }

  ngOnInit() {
  }
}
