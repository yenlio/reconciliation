import { ReconciliationNapasEntity } from '../entity';
export class ResponseGetReconciliationNapasDto {
  constructor(
    public total: number,
    public status: string,
    public datas: ReconciliationNapasEntity[]
  ) {}
}
