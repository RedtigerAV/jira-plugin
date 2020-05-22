import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IReportSortsComponent } from '../interfaces/report-sorts.interfaces';
import { ReportMediator } from '../report.mediator';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';
import { MatDialog } from '@angular/material';
import { ReportSortsService } from '../../services/report-sorts.service';
import { TableID } from '@core/interfaces/structure.interfaces';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { ITableSort } from '../../interfaces/table-sort.interfaces';
import { map, switchMap, take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { TgSnackbarDanger } from '@shared/components/tg-snackbar/models/tg-snackbar.models';
import { ReportMediatorEventsEnum } from '../interfaces/report-mediator.interfaces';
import { ReportSortsModalComponent } from './report-sorts-modal/report-sorts-modal.component';

@Component({
  selector: 'app-report-sorts',
  templateUrl: './report-sorts.component.html',
  styleUrls: ['./report-sorts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportSortsComponent implements OnInit, OnDestroy, IReportSortsComponent {
  @Input() tableID: TableID;

  public sorts$ = new ReplaySubject<ITableSort[]>(1);
  public selectedSort$ = new BehaviorSubject<ITableSort>(null);

  constructor(private readonly mediator: ReportMediator,
              private readonly reportSortsService: ReportSortsService,
              private readonly snackbar: TgSnackbarService,
              private readonly cdr: ChangeDetectorRef,
              private readonly dialog: MatDialog) {
    mediator.reportSortsComponent = this;
  }

  ngOnInit() {
    this.reportSortsService.getSorts(this.tableID)
      .pipe(
        map(sorts => !!sorts ? sorts : []),
        takeUntilDestroyed(this)
      )
      .subscribe(sorts => {
        this.sorts$.next(sorts);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {}

  applySort(sort: ITableSort): void {
    if (!this.mediator.isTableLoaded) {
      this.snackbar.openSnackbar(new TgSnackbarDanger('Сначала сгенерируйте таблицу'));

      return;
    }

    this.selectedSort$.next(sort);
    this.mediator.notify(ReportMediatorEventsEnum.APPLY_SORT, sort);
    this.cdr.detectChanges();
  }

  saveSort(sort: ITableSort): void {
    this.reportSortsService.saveSort(this.tableID, sort)
      .pipe(takeUntilDestroyed(this))
      .subscribe(sorts => {
        this.sorts$.next(sorts);
        this.cdr.detectChanges();
      });
  }

  resetSelectedSort(): void {
    this.selectedSort$.next(null);
    this.cdr.detectChanges();
  }

  deleteSort(event: Event, sort: ITableSort): void {
    event.stopPropagation();

    this.reportSortsService.deleteSort(this.tableID, sort.id)
      .pipe(takeUntilDestroyed(this))
      .subscribe(sorts => {
        this.sorts$.next(sorts);
        this.cdr.detectChanges();
      });
  }

  editSort(event: Event, sort: ITableSort): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ReportSortsModalComponent, {
      data: {
        title: 'Edit sort',
        sort
      }
    });

    dialogRef.afterClosed()
      .pipe(
        take(1),
        switchMap(result => !!result ? this.reportSortsService.patchSort(this.tableID, result) : of(null)),
        take(1)
      )
      .subscribe(resultSorts => {
        if (resultSorts) {
          this.sorts$.next(resultSorts);
          this.cdr.detectChanges();
        }
      });
  }
}
