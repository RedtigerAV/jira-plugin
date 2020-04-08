import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFiltersComponent } from './report-filters.component';
import { ReportFiltersService } from '@core/services/report-filters.service';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { TrackByPipeModule } from '@shared/pipes/trackBy/track-by-pipe.module';
import { ReportFilterModalModule } from './report-filter-modal/report-filter-modal.module';



@NgModule({
  declarations: [ReportFiltersComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    TrackByPipeModule,
    ReportFilterModalModule
  ],
  exports: [ReportFiltersComponent],
  providers: [ReportFiltersService]
})
export class ReportFiltersModule { }
