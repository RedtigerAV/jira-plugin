import { Component, OnInit } from '@angular/core';
import { IssuesService } from './core/api/platform/api/issues.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jira Timgo';

  constructor(private readonly apiService: IssuesService) {
  }

  ngOnInit(): void {
    this.apiService.getIssue('JTT-1').subscribe(x => console.log(x));
  }
}
