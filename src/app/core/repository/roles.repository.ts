import { ResponseGetFullRolesDto } from '../../core/dto';
import { PermissionEntity } from '../../core/entity';
import { Observable } from 'rxjs';
export abstract class RolesRepository {
  public abstract getRole(): Observable<ResponseGetFullRolesDto[]>;

  public abstract getRoleByID(
    payload: any
  ): Observable<ResponseGetFullRolesDto>;

  public abstract addRole(payload: any): Observable<any>;

  public abstract deleteRole(payload: any): Observable<any>;

  public abstract getPermission(): Observable<PermissionEntity[]>;

  public abstract addPermission(payload: any): Observable<any>;
}
