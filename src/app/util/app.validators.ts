import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AppUtility } from './app-utility';

export class AppValidators {
  public static validateTableNameFormat(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (AppUtility.isNullOrEmpty(value)) {
      return { tableNameRequired: true };
    }
    if (!this.isValidTableName(value)) {
      return { validateTableNameFormat: true };
    }
    return null;
  }
  public static validateMultipleTableNameFormat(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (AppUtility.isNullOrEmpty(value)) {
      return { tableNameRequired: true };
    }
    // validate table Name format for each
    const arrayValues = value.split(';');
    for (const tabName of arrayValues) {
      if (!this.isValidTableName(tabName)) {
        return { validateTableNameFormat: true };
      }
    }
    return null;
  }
  public static isValidTableName(tableName: string): boolean {
    if (tableName.indexOf('.') <= 0) {
      return false;
    }
    return true;
  }
  public static validateColumnNames(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (AppUtility.isNullOrEmpty(value)) {
      return { columnNameRequired: true };
    }
    return null;
  }
  public static validateAppDialog(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (AppUtility.isNullOrEmpty(value)) {
      return { envNotSpecified: true };
    }
    return null;
  }
}
