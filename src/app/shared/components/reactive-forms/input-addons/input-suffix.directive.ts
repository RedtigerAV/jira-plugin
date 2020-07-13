import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: ' [appInputSuffix]'
})
export class InputSuffixDirective {
  // tslint:disable-next-line no-any
  constructor(public templateRef: TemplateRef<any>) {}
}
