import { Observable } from 'rxjs';
import { User, Roles } from '../entity';
import { ResponseGetListUserDto, PayloadGetListUserDto,ValidateUserDto } from '../dto';
export abstract class UserManagerRepository {
  public abstract getAllUser(
    payload: PayloadGetListUserDto
  ): Observable<ResponseGetListUserDto>;
  public abstract getRoles(): Observable<Roles[]>;
  public abstract getByUserName(userName: string): Observable<User>;
  public abstract saveUser(payload: User[]): Observable<User>;
  // public abstract updateUser(path: string, body: {}): Observable<User>;
  public abstract deleteUser(path: string, body: {}): Observable<User>;
  public abstract validateUser(body: {}): Observable<ValidateUserDto>;
}
