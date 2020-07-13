import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { IDataSource } from '../interfaces/datasource.interfaces';
import { DataSourceBase } from '@core/datasources/datasource.base';
import { IAutocompleteStrategy } from './strategies/autocomplete.strategy';
import { PrimitiveValueAutocompleteStrategy } from './strategies/primitive-value.strategy';
import { OptionValueAutocompleteStrategy } from './strategies/option-value.strategy';
import { InputModeEnum } from '@core/enums/input-mode.enum';
import { CustomOptionDirective } from '@shared/components/reactive-forms/directives/custom-option/custom-option.directive';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: AutocompleteInputComponent }]
})
// tslint:disable: no-any
export class AutocompleteInputComponent implements ControlValueAccessor, MatFormFieldControl<any>, OnInit, OnDestroy {
  // tslint:enable: no-any

  private static nextId = 0;

  @ViewChild('inputControl', { static: true })
  public inputControl: ElementRef;

  @Input()
  public optionDirective: CustomOptionDirective;

  @Input()
  public inputMode: InputModeEnum;

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
  // tslint:disable-next-line: no-any
  public dataSource: IDataSource<any, any>;

  @Input()
  // tslint:disable-next-line: no-any
  public getKey: (item: any) => any;

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

  @Input() public panelClass = '';

  public get control(): AbstractControl {
    return this.formControl || this.controlContainer.control.get(this.formControlName);
  }

  public get previewControl(): AbstractControl {
    return (
      this.previewFormControl ||
      (!!this.previewControlName ? this.controlContainer.control.get(this.previewControlName) : null)
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

  public strategy: IAutocompleteStrategy;

  /**
   * Если true, селект сохраняет опцию в FormControl. Иначе, сохраняет значение,
   * возвращаемое datasource.getKey.
   */
  @Input() public optionValue: boolean;

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
    this.strategy = this.optionValue
      ? new OptionValueAutocompleteStrategy(this.dataSource)
      : new PrimitiveValueAutocompleteStrategy(this.dataSource, this.previewControl);

    this.strategy.validate(this);

    if (this.dataSource instanceof DataSourceBase) {
      // Если DataSource является подклассом DataSourceBase то он поддерживает опции, позволяющие настроить источник данных
      // В случае AutoComplete, такой DataSource нуждается в debounce и данные сразу не нужны
      this.dataSource.setConfig({ debounce: true, eagerLoading: false });
    }

    this.inputControl.nativeElement.value = this.strategy.displayWith(this.control.value);
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
    const value = this.getKey ? this.getKey(event.option.value) : this.strategy.getValue(event.option.value);

    this.onValueChanged(value);

    this.stateChanges.next();
    this.optionSelected.emit(event);
    this.inputControl.nativeElement.value = this.dataSource.displayWith(event.option.value);
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
