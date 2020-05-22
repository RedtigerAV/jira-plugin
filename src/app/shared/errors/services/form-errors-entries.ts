import { AbstractControl } from '@angular/forms';
import cloneDeep from 'lodash-es/cloneDeep';
import { validationErrorsEntries } from '@shared/errors/validation/consts/validation-errors';
import { IErrorsEntries } from '@shared/errors/interfaces/validation.interface';
export interface IErrorsEntriesState {
  extendValidationEntries(
    formControl: AbstractControl,
    entries: IErrorsEntries
  ): void;
  getValidationEntries(formControl: AbstractControl): IErrorsEntries;
}

const entriesState = Symbol('entriesState');
const validationEntriesKey = 'validationEntries';

/**
 * Класс, реализующий алгоритм обновления и расширения объектов {[ключ ошибки]: ее сообщение}
 * на определенном formControl
 */
export class FormErrorsEntries implements IErrorsEntriesState {
  private readonly globalValidationEntries: IErrorsEntries;
  private readonly globalServerEntries: IErrorsEntries;

  constructor() {
    this.globalValidationEntries = cloneDeep(validationErrorsEntries);
  }

  /**
   * Метод, расширяющий и/или обновляющий объекты валидационных ошибок для определенного formControl'а
   * @param formControl {AbstractControl} - форма, на которой необходимо
   * обновить или расширить сообщения для валидационных ошибок
   * @param entries {IErrorsEntries} - объект пар {[ключ ошибки]: ее сообщение}, который
   * будет использоваться при валидации формы
   */
  public extendValidationEntries(
    formControl: AbstractControl,
    entries: IErrorsEntries
  ): void {
    this.extendEntries(formControl, entries, validationEntriesKey);
  }

  /**
   * Возвращает объекты валидационных ошибок, которые форма обрабатывает и которые могут быть показаны на форме
   * @param formControl {AbstractControl} formControl, объекты ошибок которого хотим получить
   * @returns {IErrorsEntries} Объекты ошибок валидации, которые может обрабатывать
   * данный formControl
   */
  public getValidationEntries(formControl: AbstractControl): IErrorsEntries {
    return this.getEntries(formControl, validationEntriesKey);
  }

  /**
   * Устанавливает на форму скрытое свойство entriesState, в котором хранятся
   * объекты ошибок {[ключ ошибки]: ее сообщение}, специфичные для этой формы
   * @param formControl
   * @param entries
   * @param entriesKey
   */
  private extendEntries(
    formControl: AbstractControl,
    entries: IErrorsEntries,
    entriesKey: string
  ): void {
    if (formControl[entriesState] && formControl[entriesState][entriesKey]) {
      formControl[entriesState] = {
        ...formControl[entriesState],
        [entriesKey]: {
          ...formControl[entriesState][entriesKey],
          ...entries
        }
      };
    } else if (formControl[entriesState]) {
      formControl[entriesState] = {
        ...formControl[entriesState],
        [entriesKey]: {
          ...entries
        }
      };
    } else {
      formControl[entriesState] = {
        [entriesKey]: {
          ...entries
        }
      };
    }
  }

  /**
   * Возвращает объект всех ошибок (валидационных или непредвиденных серверных) {[ключ ошибки]: ее сообщение},
   * которые специфичны конкретно для этой формы.
   * @param formControl
   * @param entriesKey
   */
  private getEntries(
    formControl: AbstractControl,
    entriesKey: string
  ): IErrorsEntries {
    let entries = {
      ...(entriesKey === validationEntriesKey
        ? this.globalValidationEntries
        : this.globalServerEntries)
    };

    while (!!formControl) {
      if (formControl[entriesState] && formControl[entriesState][entriesKey]) {
        entries = {
          ...entries,
          ...formControl[entriesState][entriesKey]
        };
      }

      formControl = formControl.parent;
    }

    return entries;
  }
}
