import { PartnerEntity } from '../entity';
import { Observable } from 'rxjs';
export abstract class PartnerRepository {
  public abstract getAll(): Observable<PartnerEntity[]>;
}
