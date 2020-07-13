import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appEmptyOption]'
})
/**
 * Директива для добавления опции, сбрасывающей значение в контролле
 *
 * Важно!
 * Так как при установке undefined или null триггер в mat-select сбрасывается, устанавливается
 * пустая строка (реализовано через <mat-option value=""></mat-option>)
 * @example
 ```
   <app-select
     label="Триггер"
     [dataSource]="eventTypesDataSource"
     [formControl]="form.controls.event_type_id"
   >
      <ng-template appEmptyOption>Пустая опция</ng-template>
    </app-select>
 ```
 */
export class EmptyOptionDirective {
  // tslint:disable-next-line no-any
  constructor(public templateRef: TemplateRef<any>) {}
}
