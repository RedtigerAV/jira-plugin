import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormErrorsEntries, IErrorsEntriesState } from '@shared/errors/services/form-errors-entries';
import {
  ErrorMessageType,
  ErrorsEntriesTypes,
  IErrorsEntries,
  IErrorsEntriesWithType
} from '@shared/errors/interfaces/validation.interface';

export interface IErrorsEntriesContext {
  extendErrorsEntries(
    formControl: AbstractControl,
    entries: IErrorsEntriesWithType[]
  ): void;
  getErrorsEntries(
    formControl: AbstractControl,
    entriesType: ErrorsEntriesTypes
  ): IErrorsEntries;
}

/**
 * Сервис для работы с ошибками форм
 */
@Injectable({
  providedIn: 'root'
})
export class FormErrorsService implements IErrorsEntriesContext {
  private readonly entriesState: IErrorsEntriesState;

  constructor() {
    this.entriesState = new FormErrorsEntries();
  }

  /**
   * Метод, расширяющий и/или обновляющий дефолтный объект
   * пар {[ключ ошибки]: ее сообщение} для определенного formControl'а
   * @example
   * const updatedEntries: IErrorsEntriesWithType[] = [
   * {
   *   key: ValidationErrorsNames.NOT_EQUIVALENT,
   *   value: 'Пароли не совпадают',
   *   type: ErrorsEntriesTypes.VALIDATION
   * },
   * {
   *   key: ValidationErrorsNames.MAX_LENGTH,
   *   value: this.method.bind(this),
   *   type: ErrorsEntriesTypes.VALIDATION
   * }
   * ]
   *
   * this.formErrorsService.extendErrorsEntries(
   *    this.form,
   *    updatedEntries
   * );
   * @param formControl {AbstractControl} форма, на которой нужно установить
   * специфичные только для нее ошибки
   * @param entries {IErrorsEntriesWithType[]} массив с объектами, которые содержат: ключ ошибки, которую нужно обновить,
   * текст ошибки (либо функция), и тип ошибки
   */
  public extendErrorsEntries(
    formControl: AbstractControl,
    entries: IErrorsEntriesWithType[]
  ): void {
    const validationEntriesWithType = entries.filter(
      ({ type }) => type === ErrorsEntriesTypes.VALIDATION
    );

    if (!!validationEntriesWithType.length) {
      const adaptedEntries = this.adaptEntriesWithType(
        validationEntriesWithType
      );

      this.entriesState.extendValidationEntries(formControl, adaptedEntries);
    }
  }

  /**
   * Возвращает объекты ошибок, которые форма обрабатывает и которые могут быть показаны на форме
   * @param formControl {AbstractControl} - форма, у которой необходимо получить объект пар
   * [ключ ошибки]: ее текст, специфичный конкретно для этой формы
   * @param entriesType {ErrorsEntriesTypes} - тип ошибок (валидационные или непредвиденные серверные),
   * которые нужно вернуть
   */
  public getErrorsEntries(
    formControl: AbstractControl,
    entriesType?: ErrorsEntriesTypes
  ): IErrorsEntries {
    return this.entriesState.getValidationEntries(formControl);
  }

  /**
   * Получает текст первой ошибки по контролу (валидационной или с сервера)
   * Должно быть единственным верным источником правильного текста ошибки
   * @param formControl {AbstractControl} - форма, текст ошибки которой нужно узнать
   */
  public getFormControlErrorText(formControl: AbstractControl): string | null {
    if (formControl.valid || !formControl.errors) {
      return null;
    }

    const errorKey = Object.keys(formControl.errors)[0];
    const errorValue = formControl.errors[errorKey];

    if (this.hasRegisteredError(formControl, ErrorsEntriesTypes.VALIDATION)) {
      const entries = this.getErrorsEntries(
        formControl,
        ErrorsEntriesTypes.VALIDATION
      );

      return this.adaptErrorMessageToText(formControl, entries[errorKey]);
    }

    if (typeof errorValue === 'string') {
      return errorValue;
    }

    return null;
  }

  /**
   * Проверяет, есть ли на форме ошибка определенного типа
   * @param formControl {AbstractControl}
   * @param entriesType {ErrorsEntriesTypes} тип ошибки
   */
  public hasRegisteredError(
    formControl: AbstractControl,
    entriesType?: ErrorsEntriesTypes
  ): boolean {
    const errors = formControl.errors;
    const errorsKeys = Object.keys(
      this.getErrorsEntries(formControl, entriesType)
    );

    return !!errors && errorsKeys.some(errorKey => !!errors[errorKey]);
  }

  /**
   * Возвращает текст сообщения ошибки
   * @param formControl {AbstractControl}
   * @param errorValue {ErrorMessageType} сообщение ошибки
   */
  private adaptErrorMessageToText(
    formControl: AbstractControl,
    errorValue: ErrorMessageType
  ): string | null {
    const isString: boolean = typeof errorValue === 'string';
    const isFunction: boolean = typeof errorValue === 'function';

    if (!isString && !isFunction) {
      return null;
    }

    if (typeof errorValue === 'string') {
      return errorValue;
    }

    if (typeof errorValue === 'function') {
      return errorValue(formControl);
    }
  }

  private adaptEntriesWithType(
    entriesWithType: IErrorsEntriesWithType[]
  ): IErrorsEntries {
    return entriesWithType.reduce(
      (acc, { key, value }) => ({
        ...acc,
        [key]: value
      }),
      {}
    );
  }
}
