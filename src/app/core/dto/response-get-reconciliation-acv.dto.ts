import { ReconciliationACVEntity } from '../entity';
export class ResponseGetReconciliationACVDto {
  constructor(public total: number,public status: string, public datas: ReconciliationACVEntity[]) {}
}
