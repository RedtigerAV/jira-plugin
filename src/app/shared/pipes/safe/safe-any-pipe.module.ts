import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeAnyPipe } from '@shared/pipes/safe/safe-any.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SafeAnyPipe],
  exports: [SafeAnyPipe]
})
export class SafeAnyPipeModule {}
