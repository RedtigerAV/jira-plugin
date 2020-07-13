import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[disableControl]'
})
export class DisableControlDirective {
  @Input() public set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';

    this.ngControl.control[action]();
  }

  constructor(private readonly ngControl: NgControl) {}
}
