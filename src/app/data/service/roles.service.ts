import { Injectable } from '@angular/core';
import { RolesRepository } from '../../core/repository';
import {
  ResponseGetFullRolesDto,
  ResponsePostPermissionDto,
  PayLoadPostPermissionDto,
  PayLoadPostRoleDto,
} from '../../core/dto';
import { Observable, of } from 'rxjs';
import { PermissionEntity } from '../../core/entity';
import { ApiRepositoryService } from './api.service';
import { API } from '../../core/constants';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class rolesService extends RolesRepository {
  constructor(private apiRepositoryService: ApiRepositoryService) {
    super();
  }

  public getRole(): Observable<ResponseGetFullRolesDto[]> {
    const path = API.API_RECONCILIATION.GET_ROLES;
    const response = this.apiRepositoryService.getData(path);
    return response;
  }
  public getRoleByID(payload: any): Observable<ResponseGetFullRolesDto> {
    const path = API.API_RECONCILIATION.GET_ROLES_BY_ID + `/${payload}`;
    return this.apiRepositoryService.getData(path);
  }

  public addRole(payload: PayLoadPostRoleDto[]): Observable<any> {
    const path = API.API_RECONCILIATION.ADD_ROLES;
    return this.apiRepositoryService.postData(path, payload);
  }

  public deleteRole(payload: PayLoadPostRoleDto[]): Observable<any> {
    const path = API.API_RECONCILIATION.DELETE_ROLES;
    return this.apiRepositoryService.postData(path, payload);
  }

  public getPermission(): Observable<PermissionEntity[]> {
    const path = API.API_RECONCILIATION.GET_PERMISSION;
    return this.apiRepositoryService.getData(path);
  }

  public addPermission(
    payload: PayLoadPostPermissionDto[]
  ): Observable<ResponsePostPermissionDto[]> {
    const path = API.API_RECONCILIATION.ADD_PERMISSION;
    return this.apiRepositoryService.postData(path, payload);
  }
}
