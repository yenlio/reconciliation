import { Injectable } from '@angular/core';
import { AuthRepository } from '../../core/repository';
import { AuthRequest, AuthResponse } from '../../core/dto';
import { Observable } from 'rxjs';
import { ApiRepositoryService } from './api.service';
import { API } from '../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends AuthRepository {
  constructor(private apiRepositoryService: ApiRepositoryService) {
    super();
  }
  public login(payload: AuthRequest): Observable<AuthResponse> {
    const path = API.API_RECONCILIATION.LOGIN;
    const authResponse = this.apiRepositoryService.postData(path, payload);
    return authResponse;
  }
}
