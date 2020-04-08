import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup
} from '@angular/forms';
import { BooleanFormState } from '@shared/helpers/types.helper';

// tslint:disable-next-line: no-any
export function disableFormGroup<T extends object = any>(
  formGroup: FormGroup,
  disableState: BooleanFormState<T>
): void {
  function disableFormArray(
    formArray: FormArray,
    innerDisableState: BooleanFormState | boolean
  ): void {
    formArray.controls.forEach(control => {
      if (control instanceof FormControl) {
        makeControlDisabled(control, innerDisableState as boolean);
      } else if (control instanceof FormArray) {
        disableFormArray(control, innerDisableState);
      } else if (control instanceof FormGroup) {
        disableFormGroup(control, innerDisableState as BooleanFormState);
      }
    });
  }

  Object.entries(formGroup.controls).forEach(([key, control]) => {
    if (key in disableState) {
      if (control instanceof FormControl) {
        makeControlDisabled(control, disableState[key] || undefined);
      } else if (control instanceof FormArray) {
        disableFormArray(control, disableState[key]);
      } else if (control instanceof FormGroup) {
        disableFormGroup(control, disableState[key] || {});
      }
    }
  });
}

export function makeControlDisabled(
  control: FormControl,
  disabled: boolean
): void {
  if (disabled) {
    control.disable();
  } else {
    control.enable();
  }
}

// tslint:disable-next-line: no-any
export function removeFormControls<T extends object = any>(
  formGroup: FormGroup,
  controlsToRemove: BooleanFormState<T>
): void {
  function removeFromFormArray(
    formArray: FormArray,
    innerControlsToRemove: BooleanFormState | boolean
  ): void {
    formArray.controls.forEach(control => {
      if (control instanceof FormGroup) {
        removeFormControls(control, innerControlsToRemove);
      }
    });
  }

  Object.entries(formGroup.controls).forEach(([key, control]) => {
    if (!(key in controlsToRemove)) {
      return;
    }

    if (controlsToRemove[key] === true) {
      formGroup.removeControl(key);
    } else if (
      typeof controlsToRemove[key] === 'object' &&
      controlsToRemove[key] !== null
    ) {
      if (control instanceof FormArray) {
        removeFromFormArray(control, controlsToRemove[key]);
      } else if (control instanceof FormGroup) {
        removeFormControls(control, controlsToRemove[key]);
      }
    }
  });
}

export function markFormGroupTouched(formGroup: FormGroup): void {
  // tslint:disable-next-line: no-any
  (Object as any).values(formGroup.controls).forEach(control => {
    control.markAsTouched();
    // control.updateValueAndValidity();

    if (control.controls) {
      markFormGroupTouched(control);
    }
  });
}

export function resetFormErrors(form: FormGroup): void {
  form.reset();

  // tslint:disable-next-line: no-any
  (Object as any).values(form.controls).forEach(control => {
    control.setErrors(null);

    if (control.controls) {
      resetFormErrors(control);
    }
  });
}

export function setFormValueToCity(formControl: AbstractControl): void {
  const maxPrepositionLength = 0;

  function capitalizeFirstLetter(value: string): string {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  }

  function capitalizeFirstLetters(values: string[]): string[] {
    return values.map(value =>
      value.length <= maxPrepositionLength
        ? value
        : capitalizeFirstLetter(value)
    );
  }

  function updateValueBySymbol(
    values: string[],
    separators: string[]
  ): string[] {
    if (separators.length === 0) {
      return values;
    }

    return values.map(value => {
      const separator = separators[0];
      const newValues = capitalizeFirstLetters(value.split(separator));

      return updateValueBySymbol(newValues, separators.slice(1)).join(
        separator
      );
    });
  }

  if (!formControl.value) {
    return;
  }

  let formValue: string =
    typeof formControl.value === 'string'
      ? formControl.value
      : formControl.value.city;

  formValue = updateValueBySymbol([formValue], [' ', '-'])[0];

  formControl.setValue({
    city: formValue,
    parsed_city: formControl.value.parsed_city || null
  });
  formControl.updateValueAndValidity();
}
