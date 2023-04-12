import { Injectable } from '@angular/core';
import { ForgotPasswordRepository } from '../../core/repository';
import { Observable, of } from 'rxjs';
import { ApiRepositoryService } from './api.service';
import { API } from '../../core/constants';
import * as moment from 'moment';
import { GenOTPResponse, PayLoadForgotPassword } from '../../core/dto';

@Injectable({
  providedIn: 'root',
})
export class ForgotService extends ForgotPasswordRepository {
  constructor(private apiRepositoryService: ApiRepositoryService) {
    super();
  }

  public genOTP(payload: PayLoadForgotPassword): Observable<GenOTPResponse> {
    const path = API.API_RECONCILIATION.GEN_OTP;
    const response = this.apiRepositoryService.postData(path, payload);
    return response;
  }

  public confirmOTP(payload: any): Observable<GenOTPResponse> {
    const path = API.API_RECONCILIATION.CONFIRM_OTP;
    const response = this.apiRepositoryService.postData(path, payload);
    return response;
  }

  public createPassword(payload: any): Observable<GenOTPResponse> {
    const path = API.API_RECONCILIATION.CREATE_PASSWORD;
    const response = this.apiRepositoryService.postData(path, payload);
    return response;
  }
}
