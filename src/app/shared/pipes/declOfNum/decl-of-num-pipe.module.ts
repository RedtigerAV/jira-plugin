import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeclOfNumPipe } from '@shared/pipes/declOfNum/decl-of-num.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DeclOfNumPipe],
  exports: [DeclOfNumPipe]
})
export class DeclOfNumPipeModule {}
