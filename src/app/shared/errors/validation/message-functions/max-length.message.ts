import { AbstractControl } from '@angular/forms';

export function maxLengthMessage(formControl: AbstractControl): string | null {
  if (!formControl.errors) {
    return null;
  }

  const requiredLength = formControl.errors.maxlength.requiredLength;
  const numberedWord =
    requiredLength % 10 === 1 && requiredLength % 100 !== 11
      ? 'символа'
      : 'символов';

  return `Не более ${requiredLength} ${numberedWord}`;
}
