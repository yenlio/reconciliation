import { PayLoadLoginDto, AuthResponse } from '../../core/dto';
import { Observable } from 'rxjs';
export abstract class AuthRepository {
  public abstract login(payload: PayLoadLoginDto): Observable<AuthResponse>;
}
