import { Injectable } from '@angular/core';
import { ReconciliationRepository } from '../../core/repository';
import {
  PayLoadGetReconciliationDto,
  ResponseGetReconciliationDto,
  PayLoadGetReconciliationPartnerDto,
  ResponseGetReconciliationNapasDto,
  ResponseGetReconciliationACVDto,
  ResponseGetReconciliationAcctFileDto,
  ResponseGetFullRolesDto,
} from '../../core/dto';
import { Observable, of } from 'rxjs';
import {
  ReconciliationNapasEntity,
  ReconciliationACVEntity,
  PermissionEntity,
} from '../../core/entity';
import { ApiRepositoryService } from './api.service';
import { API } from '../../core/constants';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ReconciliationService extends ReconciliationRepository {
  reconciliation: ResponseGetReconciliationDto = {
    total: 100,
    datas: [],
  };
  // reconciliationNapas: ResponseGetReconciliationNapasDto = {
  //   total: 100,
  //   datas: [],
  // };

  constructor(private apiRepositoryService: ApiRepositoryService) {
    super();
  }

  public getAll(
    payload: PayLoadGetReconciliationDto
  ): Observable<ResponseGetReconciliationDto> {
    const path = API.API_RECONCILIATION.GET_RECONCILIATIONS;
    const payLoadNew = JSON.parse(JSON.stringify(payload));
    // payLoadNew.startDate = moment(payLoadNew.startDate)
    //   .format('DD-MMM-YY')
    //   .toUpperCase();
    // payLoadNew.endDate = moment(payLoadNew.endDate)
    //   .format('DD-MMM-YY')
    //   .toUpperCase();

    payLoadNew.startDate = Math.ceil(
      new Date(payLoadNew.startDate).getTime() / 1000
    ).toString();
    payLoadNew.endDate = Math.ceil(
      new Date(payLoadNew.endDate).getTime() / 1000
    ).toString();
    payLoadNew.partnerName = payLoadNew.partnerCode;
    delete payLoadNew.keyword;

    // return of(this.reconciliation);
    return this.apiRepositoryService.postData(path, payLoadNew);
  }

  public getAllAcct(
    payload: PayLoadGetReconciliationDto
  ): Observable<ResponseGetReconciliationAcctFileDto> {
    const path = API.API_RECONCILIATION.GET_SUMMARY_ACCT_FILE;
    const payLoadNew = JSON.parse(JSON.stringify(payload));
    // payLoadNew.startDate = moment(payLoadNew.startDate)
    //   .format('DD-MMM-YY')
    //   .toUpperCase();
    // payLoadNew.endDate = moment(payLoadNew.endDate)
    //   .format('DD-MMM-YY')
    //   .toUpperCase();

    payLoadNew.startDate = Math.ceil(
      new Date(payLoadNew.startDate).getTime() / 1000
    ).toString();
    payLoadNew.endDate = Math.ceil(
      new Date(payLoadNew.endDate).getTime() / 1000
    ).toString();
    payLoadNew.partnerName = payLoadNew.partnerCode;
    delete payLoadNew.keyword;

    // return of(this.reconciliation);
    return this.apiRepositoryService.postData(path, payLoadNew);
  }

  public getReconciliationPartnerNapas(
    payload: PayLoadGetReconciliationPartnerDto
  ): Observable<ResponseGetReconciliationNapasDto> {
    const path = API.API_RECONCILIATION.GET_RECONCILIATION_PARTNER;
    const payLoadNew = JSON.parse(JSON.stringify(payload));
    // payLoadNew.startDate = moment(payLoadNew.startDate)
    //   .format('DD-MMM-YY')
    //   .toUpperCase();
    // payLoadNew.endDate = moment(payLoadNew.endDate)
    //   .format('DD-MMM-YY')
    //   .toUpperCase();

    payLoadNew.startDate = Math.ceil(
      new Date(payLoadNew.startDate).getTime() / 1000
    ).toString();
    payLoadNew.endDate = Math.ceil(
      new Date(payLoadNew.endDate).getTime() / 1000
    ).toString();
    payLoadNew.partnerName = payLoadNew.partnerCode;
    // return of(this.reconciliationNapas);
    return this.apiRepositoryService.postData(path, payLoadNew);
  }

  public getReconciliationPartnerACV(
    payload: PayLoadGetReconciliationPartnerDto
  ): Observable<ResponseGetReconciliationACVDto> {
    const path = API.API_RECONCILIATION.GET_RECONCILIATION_PARTNER;
    const payLoadNew = JSON.parse(JSON.stringify(payload));
    // payLoadNew.startDate = moment(payLoadNew.startDate)
    //   .format('DD-MMM-YY')
    //   .toUpperCase();
    // payLoadNew.endDate = moment(payLoadNew.endDate)
    //   .format('DD-MMM-YY')
    //   .toUpperCase();
    payLoadNew.startDate = Math.ceil(
      new Date(payLoadNew.startDate).getTime() / 1000
    ).toString();
    payLoadNew.endDate = Math.ceil(
      new Date(payLoadNew.endDate).getTime() / 1000
    ).toString();
    payLoadNew.partnerName = payLoadNew.partnerCode;
    // return of(this.reconciliationNapas);
    return this.apiRepositoryService.postData(path, payLoadNew);
  }

  public updateReconciliationsPartnerNapas(
    payload: ReconciliationNapasEntity[]
  ): Observable<ReconciliationNapasEntity[]> {
    const path = API.API_RECONCILIATION.UPDATE_RECONCILIATIONS_NAPAS;

    return this.apiRepositoryService.postData(path, payload);
  }

  public updateReconciliationsPartnerACV(
    payload: ReconciliationACVEntity[]
  ): Observable<ReconciliationACVEntity[]> {
    const path = API.API_RECONCILIATION.UPDATE_RECONCILIATIONS_ACV;

    return this.apiRepositoryService.postData(path, payload);
  }

  public exportReport(payload: any) {
    const path = API.API_RECONCILIATION.EXPORT_REPORT;

    return this.apiRepositoryService.postDataFile(path, payload);
  }
}
