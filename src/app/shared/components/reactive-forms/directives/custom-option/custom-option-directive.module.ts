import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomOptionDirective } from '@shared/components/reactive-forms/directives/custom-option/custom-option.directive';

@NgModule({
  declarations: [CustomOptionDirective],
  imports: [CommonModule],
  exports: [CustomOptionDirective]
})
export class CustomOptionDirectiveModule {}
