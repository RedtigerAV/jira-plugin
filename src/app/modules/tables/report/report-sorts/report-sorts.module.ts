import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSortsComponent } from './report-sorts.component';
import { ReportSortsService } from '../../services/report-sorts.service';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { TrackByPipeModule } from '@shared/pipes/trackBy/track-by-pipe.module';
import { ReportSortsModalModule } from './report-sorts-modal/report-sorts-modal.module';



@NgModule({
  declarations: [ReportSortsComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    TrackByPipeModule,
    MatButtonModule,
    ReportSortsModalModule
  ],
  exports: [ReportSortsComponent],
  providers: [ReportSortsService]
})
export class ReportSortsModule { }
