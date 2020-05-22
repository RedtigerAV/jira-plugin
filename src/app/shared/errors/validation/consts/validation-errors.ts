import { IErrorsEntries } from '@shared/errors/interfaces/validation.interface';


/**
 * Ключи валидационных ошибок фронта
 */
export enum ValidationErrorsNames {
  REQUIRED = 'required',
  MASK = 'Mask error',
}

/**
 * Объект пар ключ-значение, где ключ - имя ошибки, а значение - сообщение об ошибке
 */
export const validationErrorsEntries: IErrorsEntries = {
  [ValidationErrorsNames.REQUIRED]: 'Поле обязательно для заполнения',
  [ValidationErrorsNames.MASK]: 'Неверный формат поля'
};
