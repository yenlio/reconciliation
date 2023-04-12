import { ServiceTypeEntity } from '../entity';
import { Observable } from 'rxjs';
export abstract class ServiceTypeRepository {
  public abstract getAll(): Observable<ServiceTypeEntity[]>;
}
