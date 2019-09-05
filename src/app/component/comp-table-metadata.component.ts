import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { AppUtility } from '../util/app-utility';
import { AppValidators } from '../util/app.validators';
import { MatDialog } from '@angular/material/dialog';
import { AppPostDialogComponent } from '../dialog/app-post-dialog.component';
import { ITableMeta } from '../modal/table-meta';
import { IEnvModal } from '../modal/env-modal';

@Component({
  selector: 'app-comp-tab-metadata',
  templateUrl: '../html/comp-table-metadata.component.html'
})
export class CompTabMetaDataComponent implements OnInit {
  tableNames = new FormControl('test.asd');
  primaryTableName = new FormControl();
  secondaryTableName = new FormControl();
  primaryColumnNames = new FormControl();
  secondaryColumnNames = new FormControl();
  priSecMatchWithColumns = false;
  tableMetaRequestModal = {} as ITableMeta;

  constructor(public matDialog: MatDialog) {
    console.log('Constructor invoked');
  }
  ngOnInit(): void {
    this.tableNames.markAsTouched();
    this.primaryTableName.markAsTouched();
    this.secondaryTableName.markAsTouched();
    this.primaryColumnNames.markAsTouched();
    this.secondaryColumnNames.markAsTouched();
  }

  toggleValidationState() {
    this.priSecMatchWithColumns = !this.priSecMatchWithColumns;
  }
  submitForm() {
    let isFormValid = true;
    if (!this.priSecMatchWithColumns) {
      const tableNamesError = AppValidators.validateMultipleTableNameFormat(this.tableNames);
      if (!AppUtility.isNullOrEmptyObject(tableNamesError)) {
        this.tableNames.setErrors(tableNamesError);
        isFormValid = false;
      }
    } else {
      const priTableValErrors = AppValidators.validateTableNameFormat(this.primaryTableName);
      if (!AppUtility.isNullOrEmptyObject(priTableValErrors)) {
        this.primaryTableName.setErrors(priTableValErrors);
        isFormValid = false;
      }
      const priTableColumnValErrors = AppValidators.validateColumnNames(this.primaryColumnNames);
      if (!AppUtility.isNullOrEmptyObject(priTableColumnValErrors)) {
        this.primaryColumnNames.setErrors(priTableColumnValErrors);
        isFormValid = false;
      }
      const secTableValErrors = AppValidators.validateTableNameFormat(this.secondaryTableName);
      if (!AppUtility.isNullOrEmptyObject(secTableValErrors)) {
        this.secondaryTableName.setErrors(secTableValErrors);
        isFormValid = false;
      }
      const secTableColumnValErrors = AppValidators.validateColumnNames(this.secondaryColumnNames);
      if (!AppUtility.isNullOrEmptyObject(secTableColumnValErrors)) {
        this.secondaryColumnNames.setErrors(secTableColumnValErrors);
        isFormValid = false;
      }
    }
    if (isFormValid) {
      if (!this.priSecMatchWithColumns) {
        this.tableMetaRequestModal.tableNames = this.tableNames.value;
      } else {
        this.tableMetaRequestModal.primaryTableName = this.primaryTableName.value;
        this.tableMetaRequestModal.secondaryTableName = this.secondaryTableName.value;
        this.tableMetaRequestModal.primaryTableColumn = this.primaryColumnNames.value;
        this.tableMetaRequestModal.secondaryTableColumn = this.secondaryColumnNames.value;
      }

      console.log('Submitted to Server' + this.tableMetaRequestModal);
      this.matDialog.open(AppPostDialogComponent, {data: this.tableMetaRequestModal})
        .afterClosed()
        .subscribe(result => {
          console.log(result + 'result from dialog ' +
            this.tableMetaRequestModal.primaryEnv + ' -- ' + this.tableMetaRequestModal.secondaryEnv);
        });
    }
  }
  resetForm() {
    console.log('resetting entire form');
    this.tableNames = new FormControl();
    this.primaryTableName = new FormControl();
    this.secondaryTableName = new FormControl();
    this.primaryColumnNames = new FormControl();
    this.secondaryColumnNames = new FormControl();
    this.ngOnInit();
  }
}
