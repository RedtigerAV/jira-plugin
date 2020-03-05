import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { pairwise, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';
import { MatCheckboxChange } from '@angular/material';
import { ControlValueAccessorBase } from '@shared/utils/control-value-accessor.base';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true
    }
  ]
})
export class CheckboxComponent extends ControlValueAccessorBase
  implements OnInit, OnDestroy {
  @ViewChild(FormControlDirective, { static: true })
  public formControlDirective: FormControlDirective;

  @Input()
  public formControl: FormControl;

  @Input()
  public label: string;

  @Input()
  public placeholder: string;

  @Input()
  public formControlName: string;

  @Input()
  public type = 'text';

  @Input()
  public labelPosition: 'before' | 'after';

  @Output()
  public onChange = new EventEmitter<MatCheckboxChange>();

  public get control(): AbstractControl {
    return (
      this.formControl ||
      this.controlContainer.control.get(this.formControlName)
    );
  }

  constructor(
    public readonly formErrorsService: FormErrorsService,
    public readonly controlContainer: ControlContainer,
    private readonly cdr: ChangeDetectorRef
  ) {
    super(controlContainer, formErrorsService);
  }

  public ngOnInit(): void {
    this.control.statusChanges
      .pipe(
        startWith(null),
        pairwise(),
        takeUntilDestroyed(this)
      )
      .subscribe(([prev, current]) => {
        if (prev !== current) {
          this.cdr.markForCheck();
        }
      });
  }

  // tslint:disable-next-line: no-any
  public registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  // tslint:disable-next-line: no-any
  public registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  // tslint:disable-next-line: no-any
  public writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }

  public getErrorMessage(): string {
    return this.formErrorsService.getFormControlErrorText(this.control);
  }

  public ngOnDestroy(): void {}
}
