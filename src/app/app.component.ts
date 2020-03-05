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
    // this.apiService.getIssue('JTT-1').subscribe(x => console.log(x));
    // this.httpClient.get('https://timgo.atlassian.net/rest/agile/1.0/board').subscribe(x => console.log(x));
  }
}
