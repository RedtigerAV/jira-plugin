import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CachePipe } from '@shared/pipes/cache/cache.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CachePipe],
  exports: [CachePipe]
})
export class CachePipeModule {}
