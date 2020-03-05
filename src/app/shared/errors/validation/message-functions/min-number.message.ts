import { AbstractControl } from '@angular/forms';

export function minNumberMessage(formControl: AbstractControl): string | null {
  if (!formControl.errors) {
    return null;
  }

  return `Убедитесь, что значение больше или равно ${
    formControl.errors.min.min
  }.`;
}
