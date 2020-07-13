// tslint:disable: no-any

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  OnDestroy,
  ContentChild
} from '@angular/core';
import { ControlContainer, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange, MatFormField, MatSelect } from '@angular/material';
import { ISelectValueStrategy } from './value-strategies/select.strategy';
import { PrimitiveValueStrategy } from './value-strategies/primitive-value.strategy';
import { OptionValueStrategy } from './value-strategies/option-value.strategy';
import { CustomOptionDirective } from '../directives/custom-option/custom-option.directive';
import { ControlValueAccessorBase } from '@shared/utils/control-value-accessor.base';
import { IComponentWithDataSource, IDataSource } from '@shared/components/reactive-forms/interfaces/datasource.interfaces';
import { SelectTriggerDirective } from '@shared/components/reactive-forms/select/select-trigger.directive';
import { EmptyOptionDirective } from '@shared/components/reactive-forms/directives/empty-option/empty-option.directive';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true
    }
  ]
})
export class SelectComponent extends ControlValueAccessorBase
  implements IComponentWithDataSource<any, any>, OnInit, OnDestroy {
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public formControl: FormControl;
  @Input() public formControlName: string;
  @Input() public previewControlName: string;
  @Input() public previewFormControl: FormControl;
  @Input() public dataSource: IDataSource<any, void>;
  @Input() public textNotFound: string;

  // TODO: isOutline нужен временно, для того чтобы поддержать одновременно два стиля input-а
  // КИТовый и тот что в админке c outline. Выпилить после полного перехода на КИТовый стиль.
  // Чтобы ui-sb стили работали корректно, appearance инпута должен быть legacy
  @Input() public isOutline = true;
  @Input() public panelClass = '';

  @Output() public selectionChange = new EventEmitter<MatSelectChange>();

  @ViewChild(MatFormField, { static: false }) matFormField: MatFormField;
  public panelWidth: number;

  public get control(): FormControl {
    return this.formControl || (this.controlContainer.control.get(this.formControlName) as FormControl);
  }

  public get previewControl(): FormControl {
    return (
      this.previewFormControl ||
      (!!this.previewControlName ? (this.controlContainer.control.get(this.previewControlName) as FormControl) : null)
    );
  }

  /**
   * Данная стратегия отвечает за то, как селект сохраняет выбранную опцию в форму.
   * Если @Input optionValue = true, селект сохраняет в FormControl опцию целиком. Иначе, сохраняет значение,
   * возвращаемое datasource.getKey. Начальное значение в первом случае берется из formControl
   * а во втором - из previewFormControl
   */
  public valueSelectStrategy: ISelectValueStrategy;

  @Input() public optionValue = true;

  public options$: Observable<any[]>;

  @ViewChild('select', { static: false }) selectInput: MatSelect;

  @ContentChild(CustomOptionDirective, { static: false })
  public optionDirective: CustomOptionDirective;

  @ContentChild(SelectTriggerDirective, { static: false })
  public triggerDirective: SelectTriggerDirective;

  @ContentChild(EmptyOptionDirective, { static: true })
  public emptyOptionDirective: EmptyOptionDirective;

  constructor(
    public readonly formErrorsService: FormErrorsService,
    public readonly controlContainer: ControlContainer
  ) {
    super(controlContainer, formErrorsService);

    this.textNotFound = this.textNotFound ? this.textNotFound : 'Результатов нет';
  }

  public ngOnInit(): void {
    // Определяем стратегию поведения при выборе опций
    this.valueSelectStrategy = this.defineValueStrategy();
    this.options$ = this.dataSource && this.dataSource.data$;

    // проверим соответствие переданных Input выбранному режиму работы Select-а
    if (this.valueSelectStrategy.validate) {
      this.valueSelectStrategy.validate(this);
    }
  }

  public getOptions(dataSourceOptions: any[]): any[] {
    if (!dataSourceOptions) {
      const option = this.valueSelectStrategy.getOptionOfValue(this.formControl.value);

      return option ? [option] : [];
    }

    return dataSourceOptions;
  }

  public compareWith = (o1: any, o2: any) => {
    return this.valueSelectStrategy.compareWith(o1, o2);
  };

  public ngOnDestroy(): void {}

  private defineValueStrategy(): ISelectValueStrategy {
    return this.optionValue
      ? new OptionValueStrategy(this.dataSource)
      : new PrimitiveValueStrategy(this.dataSource, this.previewControl);
  }
}
