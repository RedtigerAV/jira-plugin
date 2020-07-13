import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyOptionDirective } from '@shared/components/reactive-forms/directives/empty-option/empty-option.directive';

@NgModule({
  declarations: [EmptyOptionDirective],
  imports: [CommonModule],
  exports: [EmptyOptionDirective]
})
export class EmptyOptionDirectiveModule {}
