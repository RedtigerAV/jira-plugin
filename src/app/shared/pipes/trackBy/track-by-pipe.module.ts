import { NgModule } from '@angular/core';
import { TrackByPipe } from '@shared/pipes/trackBy/track-by.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TrackByPipe],
  imports: [CommonModule],
  exports: [TrackByPipe]
})
export class TrackByPipeModule {}
