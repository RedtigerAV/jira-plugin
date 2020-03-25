import { maxNumberMessage } from '@shared/errors/validation/message-functions/max-number.message';
import { minNumberMessage } from '@shared/errors/validation/message-functions/min-number.message';
import { IErrorsEntries } from '@shared/errors/interfaces/validation.interface';
import { minLengthMessage } from '@shared/errors/validation/message-functions/min-length.message';
import { maxLengthMessage } from '@shared/errors/validation/message-functions/max-length.message';


/**
 * Ключи валидационных ошибок фронта
 */
export enum ValidationErrorsNames {
  INCORRECT_URL = 'incorrectUrl',
  REQUIRED = 'required',
  INCORRECT_SLUG = 'incorrectSlug',
  INTEGER = 'integer',
  REQUIRED_SOME = 'requiredSome',
  INCORRECT_PHONE = 'incorrectPhone',
  INCORRECT_EMAIL = 'email',
  NOT_EQUIVALENT = 'notEquivalent',
  INCORRECT_CITY = 'incorrectCity',
  MIN_LENGTH = 'minlength',
  MAX_LENGTH = 'maxlength',
  MAX_NUMBER = 'max',
  MIN_NUMBER = 'min',
  NOT_ONLY_NUMBERS = 'notOnlyNumbers',
  PATTERN = 'pattern',
  FORBIDDEN = 'forbidden',
  FILE_EXTENSION = 'fileExtension',
  INCORRECT_NAME = 'incorrectName',
  INCORRECT_DATE = 'incorrectDate',
  MASK = 'Mask error',
  WRONG_PASSWORD = 'wrong password',
  USER_NOT_FOUND = 'user not found',
  DECIMAL = 'decimal',
  ALLOW_VALUES = 'allowValues'
}

/**
 * Объект пар ключ-значение, где ключ - имя ошибки, а значение - сообщение об ошибке
 */
export const validationErrorsEntries: IErrorsEntries = {
  [ValidationErrorsNames.INCORRECT_URL]: 'Неверный формат URL',
  [ValidationErrorsNames.REQUIRED]: 'Field is required',
  [ValidationErrorsNames.INCORRECT_SLUG]: 'Неверный формат слага',
  [ValidationErrorsNames.INTEGER]: 'Только целые числа',
  [ValidationErrorsNames.REQUIRED_SOME]: 'Минимум одно поле обязательно',
  [ValidationErrorsNames.INCORRECT_PHONE]: 'Неверный формат номера телефона',
  [ValidationErrorsNames.INCORRECT_EMAIL]: 'Неверный формат e-mail',
  [ValidationErrorsNames.NOT_EQUIVALENT]: 'Поля не совпадают',
  [ValidationErrorsNames.INCORRECT_CITY]: 'Некорректное название города',
  [ValidationErrorsNames.MIN_LENGTH]: minLengthMessage,
  [ValidationErrorsNames.MAX_LENGTH]: maxLengthMessage,
  [ValidationErrorsNames.MAX_NUMBER]: maxNumberMessage,
  [ValidationErrorsNames.MIN_NUMBER]: minNumberMessage,
  [ValidationErrorsNames.NOT_ONLY_NUMBERS]:
    'Поле не должно состоять только из цифр',
  [ValidationErrorsNames.PATTERN]: 'Неверный формат данных',
  [ValidationErrorsNames.FORBIDDEN]: 'Неверный пароль для данного пользователя',
  [ValidationErrorsNames.INCORRECT_NAME]:
    'Поле не должно содержать спецсимволы',
  [ValidationErrorsNames.INCORRECT_DATE]: 'Дата указана неверно',
  [ValidationErrorsNames.MASK]: 'Неверный формат поля',
  [ValidationErrorsNames.WRONG_PASSWORD]: 'Неверный пароль',
  [ValidationErrorsNames.USER_NOT_FOUND]:
    'Пользователь с данным email не зарегистрирован',
  [ValidationErrorsNames.FILE_EXTENSION]: 'Неверный формат файла',
  [ValidationErrorsNames.DECIMAL]: 'Неверный формат записи числа',
  [ValidationErrorsNames.ALLOW_VALUES]: `Выберите один из предложенных вариантов`
};
