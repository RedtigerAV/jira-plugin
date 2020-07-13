import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: ' [appInputPrefix]'
})
export class InputPrefixDirective {
  // tslint:disable-next-line no-any
  constructor(public templateRef: TemplateRef<any>) {}
}
