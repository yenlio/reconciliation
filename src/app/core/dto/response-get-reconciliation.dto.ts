import { ReconciliationEntity, ReconciliationAcctFileEntity } from '../entity';
export class ResponseGetReconciliationDto {
  constructor(public total: number, public datas: ReconciliationEntity[]) {}
}
export class ResponseGetReconciliationAcctFileDto {
  constructor(public total: number, public datas: ReconciliationAcctFileEntity[]) {}
}
