import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { IReportTableComponent } from '../interfaces/report-table.interfaces';
import { ReportMediator } from '../report.mediator';
import { ColumnApi, DetailGridInfo, GridApi } from 'ag-grid-community';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITableColumn, ITableDefaultColumn } from '@core/interfaces/table-column.interfaces';
import { ITableFilterState } from '@core/interfaces/table-filter.interfaces';
import { IReportContext } from '../interfaces/report-context.interfaces';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { DatePipe } from '@angular/common';
import { IReportSettings } from '@core/interfaces/report-settings.interfaces';
import { TableStateEnum } from '@core/interfaces/table-state.interface';
import { ReportMediatorEventsEnum } from '../interfaces/report-mediator.interfaces';
import { ITableSortState } from '@core/interfaces/table-sort.interfaces';
import { ITableColumnPreview } from '@core/interfaces/table-column-preview.interface';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportTableComponent implements OnInit, OnDestroy, IReportTableComponent {
  @Input() context: IReportContext;

  public columnDefs$: ReplaySubject<ITableColumn[]>;
  public defaultColDef$: ReplaySubject<ITableDefaultColumn>;
  public rowData$: ReplaySubject<any[]>;
  public tableState$ = new BehaviorSubject<TableStateEnum>(TableStateEnum.NOT_LOADED);
  public tableStateEnum = TableStateEnum;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private readonly datePipe: DatePipe;

  constructor(@Inject(LOCALE_ID) locale: string,
              private readonly mediator: ReportMediator,
              private readonly http: HttpClient) {
    mediator.reportTableComponent = this;
    this.rowData$ = new ReplaySubject<any[]>(1);
    this.columnDefs$ = new ReplaySubject<any[]>(1);
    this.defaultColDef$ = new ReplaySubject<any>(1);
    this.datePipe = new DatePipe(locale);
  }

  public ngOnInit(): void {
    this.context.getTableColumnsDef()
      .pipe(takeUntilDestroyed(this))
      .subscribe(result => this.columnDefs$.next(result));

    this.context.getTableDefaultColumnsDef()
      .pipe(takeUntilDestroyed(this))
      .subscribe(result => this.defaultColDef$.next(result));
  }

  public ngOnDestroy(): void {}

  public applyFilter(filterState: ITableFilterState): void {
    this.gridApi.setFilterModel(filterState);
  }

  public applySort(sortState: ITableSortState[]): void {
    this.gridApi.setSortModel(sortState);
  }

  public exportAsCSV(): void {
    let fileName = this.context.title.toLowerCase().split(' ').join('-');
    const currentDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

    fileName = fileName + '_' + currentDate;

    this.gridApi.exportDataAsCsv({ fileName });
  }

  public generateTable(settings: IReportSettings): void {
    this.tableState$.next(TableStateEnum.LOADING);

    this.context.getTableData(this.context.tableID, settings)
      .pipe(takeUntilDestroyed(this))
      .subscribe(result => {
        this.rowData$.next(result);
        this.tableState$.next(TableStateEnum.LOADED);
      });
  }

  public getFilterState(): ITableFilterState {
    const columnsPreview: ITableColumnPreview[] = this.gridColumnApi.getAllColumns().map(column => {
      const {field, headerName} = column.getColDef();

      return {field, headerName};
    });

    const filterModel: ITableFilterState = this.gridApi.getFilterModel();

    Object.keys(filterModel).map(columnField => {
      filterModel[columnField].columnPreview = columnsPreview.find(({field}) => field == columnField);
    });

    return filterModel;
  }

  public getSortState(): ITableSortState[] {
    const columnsPreview: ITableColumnPreview[] = this.gridColumnApi.getAllColumns().map(column => {
      const {field, headerName} = column.getColDef();

      return {field, headerName};
    });

    const sortModel: ITableSortState[] = this.gridApi.getSortModel() as ITableSortState[];

    sortModel.forEach(sort => {
      sort.columnPreview = columnsPreview.find(({field}) => field == sort.colId)
    });

    return sortModel;
  }

  public onFilterChanged(): void {
    this.mediator.notify(ReportMediatorEventsEnum.FILTER_CHANGED);
  }

  public onSortChanged(): void {
    this.mediator.notify(ReportMediatorEventsEnum.SORT_CHANGED);
  }

  public onGridReady(params: DetailGridInfo) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
