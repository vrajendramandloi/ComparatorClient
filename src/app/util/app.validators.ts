import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AppUtility } from './app-utility';

export class AppValidators {
  public static validateTableNameFormat(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!this.isValidTableName(value)) {
      return { validateTableNameFormat: 'Validation table name should be in format Schema.TableName' };
    }
    return null;
  }
  public static validateMultipleTableNameFormat(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (AppUtility.isNullOrEmpty(value)) {
      return { tableNameRequired: 'Table Name should be provided.' };
    }
    // validate table Name format for each
    const arrayValues = value.split(';');
    for (const tabName of arrayValues) {
      if (!this.isValidTableName(tabName)) {
        return { validateTableNameFormat: 'Validation table name should be in format Schema.TableName' };
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
}
