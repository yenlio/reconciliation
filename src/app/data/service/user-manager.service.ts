import { Injectable } from '@angular/core';
import { UserManagerRepository } from '../../core/repository';
import { User, UserAPI, Roles } from '../../core/entity';
import { Observable, of } from 'rxjs';
import { ApiRepositoryService } from './api.service';
import { API } from '../../core/constants';
import { ResponseGetListUserDto, PayloadGetListUserDto,ValidateUserDto } from '../../core/dto';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService extends UserManagerRepository {
  constructor(private apiRepositoryService: ApiRepositoryService) {
    super();
  }
  public getAllUser(
    payload: PayloadGetListUserDto
  ): Observable<ResponseGetListUserDto> {
    const path = API.API_RECONCILIATION.GET_USER;
    const payLoadNew = JSON.parse(JSON.stringify(payload));
    if (payLoadNew.createDate) {
      payLoadNew.createDate = Math.ceil(
        new Date(payLoadNew.createDate).getTime() / 1000
      ).toString();
    }
    return this.apiRepositoryService.postData(path, payLoadNew);
  }
  public getRoles(): Observable<Roles[]> {
    const path = API.API_RECONCILIATION.GET_ROLES;
    return this.apiRepositoryService.getData(path);
  }
  public validateUser(payload: User): Observable<ValidateUserDto> {
    const path = API.API_RECONCILIATION.VALIDATE_USER;
    return this.apiRepositoryService.postData(path, payload);
  }

  async validateUserPromise(payload: User): Promise<ValidateUserDto> {
    const path = API.API_RECONCILIATION.VALIDATE_USER;
    return this.apiRepositoryService.postData(path, payload).toPromise();
  }
  public getByUserName(username: string): Observable<User> {
    const path = API.API_RECONCILIATION.USER + '/' + username;
    return this.apiRepositoryService.getData(path);
  }
  public saveUser(payload: User[]): Observable<UserAPI> {
    const path = API.API_RECONCILIATION.SAVE_USER;
    return this.apiRepositoryService.postData(path, payload);
  }
  public deleteUser(body: {}): Observable<UserAPI> {
    const path =
      API.API_RECONCILIATION.USER + '/' + API.API_RECONCILIATION.DELETE_USER;
    return this.apiRepositoryService.postData(path, body);
  }
}
