import { Injectable } from '@angular/core';
import { AuthRepository } from '../../core/repository';
import { AuthRequest, AuthResponse } from '../../core/dto';
import { Observable } from 'rxjs';
import { ApiRepositoryService } from './api-repository.service';
import { API } from '../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService extends AuthRepository {
  constructor(private apiRepositoryService: ApiRepositoryService) {
    super();
  }
  public login(payload: AuthRequest): Observable<AuthResponse> {
    const path = API.API_RECONCILIATION.LOGIN;
    // return of(this.partnerCodes);
    return this.apiRepositoryService.postData(path, payload);
  }
}
