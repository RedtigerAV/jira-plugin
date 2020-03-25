import { Component, OnInit } from '@angular/core';
import { IssuesService } from '@core/api/platform/api/issues.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jira Timgo';

  constructor(private readonly apiService: IssuesService,
              private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // this.apiService.getChangeLogs('JTT-9').subscribe(x => console.log(x));
    // this.apiService.getIssue('JTT-9', [], false, 'transitions,changelog')
    //   .subscribe(x => console.log(x));
  }
}
