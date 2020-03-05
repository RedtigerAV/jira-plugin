import { IErrorsEntries } from '@shared/errors/interfaces/validation.interface';
import { validationErrorsEntries } from '@shared/errors/validation/consts/validation-errors';
import { unexpectedServerErrorsEntries } from '@shared/errors/validation/consts/unexpected-server-errors';

export const errorsEntries: IErrorsEntries = {
  ...validationErrorsEntries,
  ...unexpectedServerErrorsEntries
};
