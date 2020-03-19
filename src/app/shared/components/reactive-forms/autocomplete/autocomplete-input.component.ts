import {
  Component,
  ViewChild,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy,
  HostBinding,
  Optional,
  Self,
  EventEmitter,
  Output
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  ControlContainer,
  AbstractControl,
  NgControl
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatFormFieldControl
} from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';

//tslint:disable

export interface IAutocompleteDataSource {
  // tslint:disable-next-line: no-any
  data$: Observable<any>;
  filterChanged: (value: string) => void;
  // tslint:disable-next-line: no-any
  getValue: (item: any) => any;
  // tslint:disable-next-line: no-any
  displayWith: (item: any) => string;
}

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: AutocompleteInputComponent }
  ]
})
// tslint:disable: no-any
export class AutocompleteInputComponent
  implements ControlValueAccessor, MatFormFieldControl<any>, OnInit, OnDestroy {
  // tslint:enable: no-any

  private static nextId = 0;

  @ViewChild('inputControl', { static: true })
  public inputControl: ElementRef;

  @Input()
  public formControl: FormControl;

  @Input()
  public previewFormControl: FormControl;

  @Input()
  public label: string;

  @Input()
  public placeholder: string;

  @Input()
  public formControlName: string;

  @Input()
  public previewControlName: string;

  @Input()
  public dataSource: IAutocompleteDataSource;

  @Input()
  // tslint:disable-next-line: no-any
  public getValue: (item: any) => any;

  @Input()
  public panelWidth: string;

  /*** Обновление модели при изменении значения поля ввода ***/
  @Input()
  public updateByInput: boolean;

  @Output()
  public optionSelected = new EventEmitter<MatAutocompleteSelectedEvent>();

  @Output()
  public onInput = new EventEmitter<string>();

  @HostBinding()
  public id = `autocomplete-input-${AutocompleteInputComponent.nextId++}`;

  public get control(): AbstractControl {
    return (
      this.formControl ||
      this.controlContainer.control.get(this.formControlName)
    );
  }

  public get previewControl(): AbstractControl {
    return (
      this.previewFormControl ||
      this.controlContainer.control.get(this.previewControlName)
    );
  }

  @HostBinding('class.floating')
  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  // tslint:disable-next-line: no-any
  public value: any;

  // tslint:disable-next-line: rxjs-finnish
  public stateChanges = new Subject<void>();

  public focused: boolean;

  public get empty(): boolean {
    return !this.inputControl.nativeElement.value;
  }

  @Input()
  public get required(): boolean {
    return this._required;
  }

  public set required(req: boolean) {
    this._required = req;
    this.stateChanges.next();
  }

  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = value;
    this.stateChanges.next();
  }

  public get errorState(): boolean {
    return this.ngControl.touched && !!this.ngControl.errors;
  }
  public controlType = 'autocomplete-input';
  public autofilled?: boolean;

  @HostBinding('attr.aria-describedby') public describedBy = '';

  public onTouched: () => void;
  // tslint:disable-next-line: no-any
  public onValueChanged: (value: any) => void;

  private _required = false;
  private _disabled = false;

  constructor(
    public readonly formErrorsService: FormErrorsService,
    public readonly controlContainer: ControlContainer,
    private readonly fm: FocusMonitor,
    private readonly elRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.onTouched();
      this.stateChanges.next();
    });

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  public ngOnInit(): void {
    const value = this.previewControl && this.previewControl.value;

    this.inputControl.nativeElement.value = value
      ? this.dataSource.displayWith(value)
      : this.control.value;
  }

  // tslint:disable-next-line: no-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // tslint:disable-next-line: no-any
  public registerOnChange(fn: any): void {
    this.onValueChanged = fn;
  }

  // tslint:disable-next-line: no-any
  public writeValue(obj: any): void {
    this.inputControl.nativeElement.value = obj;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.stateChanges.next();
  }

  public getErrorMessage(): string {
    return this.formErrorsService.getFormControlErrorText(this.control);
  }

  public changeInput(input: string): void {
    this.dataSource.filterChanged(input);

    if (this.formControl.value) {
      this.control.patchValue(null);
      this.inputControl.nativeElement.value = input;
    }

    this.stateChanges.next();
    this.onInput.emit(input);

    if (this.updateByInput) {
      this.onValueChanged(input);
    }
  }

  public onBlur(): void {
    this.onTouched();
    this.stateChanges.next();
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const key = this.getValue
      ? this.getValue(event.option.value)
      : this.dataSource.getValue
      ? this.dataSource.getValue(event.option.value)
      : event.option.value.id;

    this.onValueChanged(key);

    this.stateChanges.next();
    this.optionSelected.emit(event);
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
