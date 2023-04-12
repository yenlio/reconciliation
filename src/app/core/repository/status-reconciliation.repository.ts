import { StatusReconciliationEntity } from '../entity';
import { Observable } from 'rxjs';
export abstract class StatusReconciliationRepository {
  public abstract getAll(): Observable<StatusReconciliationEntity[]>;
}
