import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppPostDialogComponent } from '../dialog/app-post-dialog.component';
import { ITableMeta } from '../modal/table-meta';
import { AppUtility } from '../util/app-utility';
import { AppValidators } from '../util/app.validators';
import { DoPostService } from '../service/do-post.service';
import { IAppResponseModal } from '../modal/app-response-modal';

@Component({
  selector: 'app-comp-tab-metadata',
  templateUrl: '../html/comp-table-metadata.component.html'
})
export class CompTabMetaDataComponent implements OnInit {
  tableNames = new FormControl('test.asd');
  primaryTableName = new FormControl();
  secondaryTableName = new FormControl();
  columnNames = new FormControl();
  priSecMatchWithColumns = false;
  tableMetaRequestModal = {} as ITableMeta;
  isSubmitEnabled = true;
  isProgressSpinnerEnabled = false;
  outputResponseList: Array<string>;
  outputErrorList: Array<string>;

  constructor(public matDialog: MatDialog, public postService: DoPostService) {
    console.log('Constructor invoked');
  }
  ngOnInit(): void {
    this.priSecMatchWithColumns = true;
    this.primaryTableName.setValue('VRAJ_OWNER.TEMP_TABLE1');
    this.secondaryTableName.setValue('VRAJ_OWNER.TEMP_TABLE2');
    this.columnNames.setValue('TEMP_ID;SEGMENT_NUMBER;TEMP_DATE;TEMP_IS_TAKEN;TEMP_NAME;TEMP_ADDRESS');

    this.tableNames.markAsTouched();
    this.primaryTableName.markAsTouched();
    this.secondaryTableName.markAsTouched();
    this.columnNames.markAsTouched();
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
      const secTableValErrors = AppValidators.validateTableNameFormat(this.secondaryTableName);
      if (!AppUtility.isNullOrEmptyObject(secTableValErrors)) {
        this.secondaryTableName.setErrors(secTableValErrors);
        isFormValid = false;
      }
      const columnNamesValErrors = AppValidators.validateColumnNames(this.columnNames);
      if (!AppUtility.isNullOrEmptyObject(columnNamesValErrors)) {
        this.columnNames.setErrors(columnNamesValErrors);
        isFormValid = false;
      }
    }
    if (isFormValid) {
      if (!this.priSecMatchWithColumns) {
        this.tableMetaRequestModal.tableNames = this.tableNames.value.split(';');
      } else {
        this.tableMetaRequestModal.primaryTableName = this.primaryTableName.value;
        this.tableMetaRequestModal.secondaryTableName = this.secondaryTableName.value;
        this.tableMetaRequestModal.columnNames = this.columnNames.value.split(';');
      }

      console.log('Submitted to Server' + this.tableMetaRequestModal);
      this.matDialog.open(AppPostDialogComponent, { data: this.tableMetaRequestModal })
        .afterClosed()
        .subscribe(result => {
          if ('POST' === result) {
            this.isProgressSpinnerEnabled = true;
            this.isSubmitEnabled = false;
            /*this.postService.validatehelloWorld();*/
            this.postService.validateTableMetadata(this.tableMetaRequestModal)
            .subscribe((response: IAppResponseModal) => {
              if (response != null && response.outputList.length !== 0) {
                this.outputResponseList = response.outputList;
                if (response.errorList.length !== 0) {
                  this.outputErrorList = response.errorList;
                }
              }
              console.log('Response Log:' + response.toString());
              this.isProgressSpinnerEnabled = false;
              this.isSubmitEnabled = true;
            });
          }
        });
    }
  }
  resetForm() {
    console.log('resetting entire form');
    this.tableNames = new FormControl();
    this.primaryTableName = new FormControl();
    this.secondaryTableName = new FormControl();
    this.columnNames = new FormControl();
    this.ngOnInit();
  }
}
