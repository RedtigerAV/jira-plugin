import { AbstractControl } from '@angular/forms';

export function minLengthMessage(formControl: AbstractControl): string | null {
  if (!formControl.errors) {
    return null;
  }

  const requiredLength = formControl.errors.minlength.requiredLength;
  const numberedWord =
    requiredLength % 10 === 1 && requiredLength % 100 !== 11
      ? 'символа'
      : 'символов';

  return `Не менее ${requiredLength} ${numberedWord}`;
}
