import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static alphabetic(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const valid = /^[a-zA-Z]+$/.test(value);
      return valid ? null : { alphabetic: true };
    };
  }
}
