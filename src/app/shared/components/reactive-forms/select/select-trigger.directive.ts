import { Directive, TemplateRef } from '@angular/core';

// tslint:disable no-any

@Directive({
  selector: '[appSelectTrigger]'
})
export class SelectTriggerDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
