import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCustomOption]'
})
/**
 * Директива для кастомного шаблона темплейта опций
 * @example
 ```
 <app-autocomplete
   [label]="getEmitterName()"
   placeholder="Начните вводить название"
   [dataSource]="emitterDataSource"
   [formControl]="form.controls.emitter_id"
   [previewFormControl]="form.controls.emitter"
   [disableControl]="context.isEmitterDisabled"
 >
   <ng-template appCustomOption let-option>
     <div class="class-name">
       <span>{{ option.name }}</span>
       <br />
       <span>{{ option.id }}</span>
     </div>
   </ng-template>
 </app-autocomplete>
 ```
 */
export class CustomOptionDirective {
  // tslint:disable-next-line no-any
  constructor(public templateRef: TemplateRef<any>) {}
}
