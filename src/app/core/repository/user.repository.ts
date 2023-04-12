import { Observable } from 'rxjs';
import { User } from '../entity';

export abstract class UserRepository {
  abstract getAllUser(): Observable<User>;
  abstract getByUserName(userName: string): Observable<User>;
  abstract login(userName: string, password: string): Observable<User>;

  

}
