import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { ColumnApi, DetailGridInfo, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableGridComponent {
  public columnDefs;
  public defaultColDef;
  public rowData: ReplaySubject<any[]>;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(private http: HttpClient) {
    this.rowData = new ReplaySubject<any>(1);
    this.columnDefs = [
      {
        field: 'athlete',
        filter: 'agTextColumnFilter',
        filterParams: {
          applyButton: true,
          resetButton: true,
        },
      },
      {
        field: 'age',
        filter: 'agNumberColumnFilter',
        filterParams: {
          applyButton: true,
          resetButton: true,
        },
      },
      {
        field: 'country',
        filter: 'agTextColumnFilter',
        filterParams: {
          applyButton: true,
          resetButton: true,
        },
      },
      {
        field: 'year',
      },
      { field: 'sport' },
      {
        field: 'gold',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'silver',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'bronze',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'total',
        filter: 'agNumberColumnFilter',
      },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      filter: true,
      minHeight: 100
    };
  }

  onGridReady(params: DetailGridInfo) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
      )
      .subscribe((data: Array<any>) => {
        this.rowData.next(data.slice(0, 100));
      });
  }

  public getFilterModel(): void {
    console.log(this.gridApi.getFilterModel());
  }

  public setFilterModel(): void {
    const filter = {
      age: {
        filterType: 'number',
        type: 'greaterThan',
        filter: 23,
        filterTo: null
      },
      country: {
        filterType: 'text',
        type: 'contain',
        filter: 'r'
      }
    };

    this.gridApi.setFilterModel(filter);
    this.getFilterModel();
  }
}
