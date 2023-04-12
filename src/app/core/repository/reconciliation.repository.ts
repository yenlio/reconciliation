import {
  PayLoadGetReconciliationDto,
  ResponseGetReconciliationDto,
  PayLoadGetReconciliationPartnerDto,
  ResponseGetReconciliationNapasDto,
} from '../../core/dto';
import { ReconciliationNapasEntity } from '../../core/entity';
import { Observable } from 'rxjs';
export abstract class ReconciliationRepository {
  public abstract getAll(
    filter: PayLoadGetReconciliationDto
  ): Observable<ResponseGetReconciliationDto>;

  public abstract getReconciliationPartnerNapas(
    filter: PayLoadGetReconciliationPartnerDto
  ): Observable<ResponseGetReconciliationNapasDto>;

  public abstract updateReconciliationsPartnerNapas(
    filter: ReconciliationNapasEntity[]
  ): Observable<ReconciliationNapasEntity[]>;
}
