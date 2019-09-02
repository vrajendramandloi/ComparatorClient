import { ValidationErrors, AbstractControl, FormControl } from '@angular/forms';

export class AppUtility {
  static isNullOrEmpty(value: string): boolean {
    if (value === null || value === '') {
      return true;
    }
    return false;
  }
  static isNullOrEmptyObject(value: object): boolean {
    if (value === null || Object.keys(value).length === 0) {
      return true;
    }
    return false;
  }
}
