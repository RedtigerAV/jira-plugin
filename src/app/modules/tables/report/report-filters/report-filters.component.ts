import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IReportFiltersComponent } from '../interfaces/report-filters.interfaces';
import { ReportMediator } from '../report.mediator';
import { TableID } from '@core/interfaces/table-main-info.interface';
import { ITableFilter } from '@core/interfaces/table-filter.interfaces';
import { ReportFiltersService } from '@core/services/report-filters.service';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { map, switchMap, take } from 'rxjs/operators';
import { ReportMediatorEventsEnum } from '../interfaces/report-mediator.interfaces';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';
import { TgSnackbarDanger } from '@shared/components/tg-snackbar/models/tg-snackbar.models';
import { MatDialog } from '@angular/material';
import { ReportFilterModalComponent } from './report-filter-modal/report-filter-modal.component';

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFiltersComponent implements OnInit, OnDestroy, IReportFiltersComponent {
  @Input() tableID: TableID;

  public filters$ = new ReplaySubject<ITableFilter[]>(1);
  public selectedFilter$ = new BehaviorSubject<ITableFilter>(null);

  constructor(private readonly mediator: ReportMediator,
              private readonly reportFiltersService: ReportFiltersService,
              private readonly snackbar: TgSnackbarService,
              private readonly cdr: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
    mediator.reportFiltersComponent = this;
  }

  ngOnInit(): void {
    this.reportFiltersService.getFilters(this.tableID)
      .pipe(
        map(filters => !!filters ? filters : []),
        takeUntilDestroyed(this)
      )
      .subscribe(filters => {
        this.filters$.next(filters);
        this.cdr.detectChanges();
      })
  }

  ngOnDestroy(): void {}

  applyFilter(filter: ITableFilter): void {
    if (!this.mediator.isTableLoaded) {
      this.snackbar.openSnackbar(new TgSnackbarDanger('Please generate table first'));

      return;
    }

    this.selectedFilter$.next(filter);
    this.mediator.notify(ReportMediatorEventsEnum.APPLY_FILTER, filter);
    this.cdr.detectChanges();
  }

  saveFilter(filter: ITableFilter): void {
    this.reportFiltersService.saveFilter(this.tableID, filter)
      .pipe(takeUntilDestroyed(this))
      .subscribe(filters => {
        this.filters$.next(filters);
        this.cdr.detectChanges();
      });
  }

  resetSelectedFilter(): void {
    this.selectedFilter$.next(null);
    this.cdr.detectChanges();
  }

  deleteFilter(event: Event, filter: ITableFilter): void {
    event.stopPropagation();

    this.reportFiltersService.deleteFilter(this.tableID, filter.id)
      .pipe(takeUntilDestroyed(this))
      .subscribe(filters => {
        this.filters$.next(filters);
        this.cdr.detectChanges();
      });
  }

  editFilter(event: Event, filter: ITableFilter): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ReportFilterModalComponent, {
      data: {
        title: 'Edit filter',
        filter
      }
    });

    dialogRef.afterClosed()
      .pipe(
        take(1),
        switchMap(result => !!result ? this.reportFiltersService.patchFilter(this.tableID, result) : of(null)),
        take(1)
      )
      .subscribe(resultFilters => {
        if (resultFilters) {
          this.filters$.next(resultFilters);
          this.cdr.detectChanges();
        }
      });
  }
}
