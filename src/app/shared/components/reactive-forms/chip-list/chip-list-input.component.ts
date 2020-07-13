// tslint:disable: no-any

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  HostBinding,
  Input,
  Optional,
  Self,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MatFormFieldControl, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject, Observable, combineLatest } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FormControl } from '@ng-stack/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { IDataSource } from '../interfaces/datasource.interfaces';
import { DataSourceBase } from '@core/datasources/datasource.base';
import { InputModeEnum } from '@core/enums/input-mode.enum';

interface IOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-chip-list-input',
  templateUrl: './chip-list-input.component.html',
  styleUrls: ['./chip-list-input.component.scss'],
  // TODO - при добавлениее эл-тов из api, показывает эл-ты,
  //  быстро не смогли пофиксить нужно разотраться
  //  актуально для создания дипломов/diploma-create-update-modal.component.ts
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: ChipListInputComponent }]
})
export class ChipListInputComponent implements MatFormFieldControl<any>, ControlValueAccessor, OnInit, OnDestroy {
  private static nextId = 0;

  @Input() public selectable = true;

  @Input() public removable = true;

  @Input() public autocomplete = true;

  @Input() public addOnBlur: boolean;

  @Input()
  public inputMode: InputModeEnum;

  public get value(): string[] {
    return this.ngControl.control.value;
  }

  // tslint:disable-next-line: rxjs-finnish
  public stateChanges = new Subject<void>();

  @HostBinding()
  public id = `chip-list-input-${ChipListInputComponent.nextId++}`;

  @Input() public get placeholder(): string {
    return this._placeholder;
  }

  public set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  public focused = false;

  public get empty(): boolean {
    return !this.ngControl.value || !this.ngControl.value.length;
  }

  @HostBinding('class.floating')
  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Input()
  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    this._required = !!value;
    this.stateChanges.next();
  }

  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = !!value;
    this.stateChanges.next();
  }

  public get errorState(): boolean {
    return this.ngControl.touched && !!this.ngControl.errors;
  }

  public controlType = 'chip-list-input';

  @HostBinding('attr.aria-describedby') public describedBy = '';

  @Input()
  public dataSource: IDataSource<any, any>;

  public separatorKeysCodes = [ENTER, COMMA];

  public selectionChanged$ = new Subject();

  public autocomplete$: Observable<any>;

  @ViewChild('input', { static: false }) private readonly input: ElementRef;

  private lookupOptions: IOption[] = [];

  private onValueChange: (value: any) => void;

  private onTouched: () => void;

  private _placeholder: string;
  private _required = false;
  private _disabled = false;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly focusMonitor: FocusMonitor,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.focusMonitor.monitor(elementRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  public ngOnInit(): void {
    if (this.dataSource instanceof DataSourceBase) {
      // Если DataSource является подклассом DataSourceBase то он поддерживает опции, позволяющие настроить источник данных
      // В случае chipListInput, такой DataSource нуждается в debounce и данные сразу не нужны
      this.dataSource.setConfig({ debounce: true, eagerLoading: false });
    }

    this.lookupOptions = (this.ngControl && this.ngControl.value || []).map(option => {
      return {
        value: option,
        viewValue: this.dataSource.displayWith(option)
      } as IOption;
    });

    if (this.autocomplete) {
      this.autocomplete$ = combineLatest([this.dataSource.data$, this.selectionChanged$.pipe(startWith(null))]).pipe(
        map(([options]) => {
          return options.filter(
            option =>
              (this.ngControl.value || []).findIndex(
                selectedOption => this.dataSource.getKey(option) === selectedOption
              ) === -1
          );
        })
      );
    }
  }

  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elementRef.nativeElement.querySelector('input').focus();
    }
  }

  public changeInput(input: string): void {
    if (this.autocomplete) {
      this.dataSource.filterChanged(input);
    }
  }

  public removeByIndex(index: number): void {
    let nextValue = [...(this.ngControl.value || [])];

    nextValue.splice(index, 1);

    if (nextValue.length === 0) {
      nextValue = null;
    }

    this.onValueChange(nextValue);
    this.selectionChanged$.next();
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const nextValue = [...(this.ngControl.value || []), event.option.value];

    this.lookupOptions.push({
      value: event.option.value,
      viewValue: event.option.viewValue
    });

    this.input.nativeElement.value = '';

    this.onValueChange(nextValue);
    this.selectionChanged$.next();
  }

  public onChipInputTokenEnd(event: MatChipInputEvent): void {
    if (!event.value) {
      return;
    }

    const nextValue = [...(this.ngControl.value || []), event.value.trim()];

    this.lookupOptions.push({
      value: event.value,
      viewValue: event.value
    });

    event.input.value = null;

    this.onValueChange(nextValue);
  }

  public getDisplayValue(value: any): string {
    const option = this.lookupOptions.find(c => c.value === value);

    return (option && option.viewValue) || this.dataSource.displayWith(value);
  }

  public onBlur(): void {
    this.onTouched();
    this.stateChanges.next();
  }

  public writeValue(value: any): void {}

  public registerOnChange(value: any): void {
    this.onValueChange = value;
  }

  public registerOnTouched(value: any): void {
    this.onTouched = value;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.stateChanges.next();
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
  }
}
