import { NgModule } from '@angular/core';
import { InputPrefixDirective } from './input-prefix.directive';
import { InputSuffixDirective } from './input-suffix.directive';

@NgModule({
  imports: [],
  exports: [InputPrefixDirective, InputSuffixDirective],
  declarations: [InputPrefixDirective, InputSuffixDirective],
  providers: []
})
export class InputAddonsModule {}
