import { Component } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { AppUtility } from '../util/app-utility';
import { AppValidators } from '../util/app.validators';

@Component({
  selector: 'app-comp-tab-metadata',
  templateUrl: '../html/comp-table-metadata.component.html'
})
export class CompTabMetaDataComponent {
  tableNames = new FormControl();
  primaryTableName = new FormControl();
  secondaryTableName = new FormControl();
  primaryColumnNames = new FormControl();
  secondaryColumnNames = new FormControl();
  priSecMatchWithColumns = false;

  toggleValidationState() {
    this.priSecMatchWithColumns = !this.priSecMatchWithColumns;
  }
  submitForm() {
    let isFormValid = true;
    if (!this.priSecMatchWithColumns) {
      const tableNamesError = AppValidators.validateMultipleTableNameFormat(this.tableNames);
      if (!AppUtility.isNullOrEmptyObject(tableNamesError)) {
        console.log(this.tableNames.errors);
        this.tableNames.setErrors(tableNamesError);
        console.log(this.tableNames.errors);
        isFormValid = false;
      }
    } else {
      const priTableValErrors = AppValidators.validateTableNameFormat(this.primaryTableName);
      if (!AppUtility.isNullOrEmptyObject(priTableValErrors)) {
        this.primaryTableName.errors.join(priTableValErrors);
        isFormValid = false;
      }
      const secTableValErrors = AppValidators.validateTableNameFormat(this.secondaryTableName);
      if (!AppUtility.isNullOrEmptyObject(secTableValErrors)) {
        this.secondaryTableName.errors.join(secTableValErrors);
        isFormValid = false;
      }
    }
    if (isFormValid) {
      console.log('Submitted to Server');
    }
  }
  resetForm() {
    console.log('resetting entire form');
    this.tableNames = new FormControl();
  }
}
