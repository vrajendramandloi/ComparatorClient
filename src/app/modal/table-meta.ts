import { IAppModal } from './app-modal';

export interface ITableMeta extends IAppModal {
  tableNames: string;
  primaryTableName: string;
  secondaryTableName: string;
  primaryTableColumn: string;
  secondaryTableColumn: string;
}
