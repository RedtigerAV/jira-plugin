import { Directive } from '@angular/core';

@Directive({
  selector: 'app-header-actions, [app-header-actions], [appHeaderActions]',
  exportAs: 'app-header-actions'
})
export class HeaderActionsDirective {}
