import { AbstractControl } from '@angular/forms';

export function maxNumberMessage(formControl: AbstractControl): string | null {
  if (!formControl.errors) {
    return null;
  }

  return `Убедитесь, что значение меньше или равно ${
    formControl.errors.max.max
  }.`;
}
