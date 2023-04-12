import { Injectable } from '@angular/core';
import { StatusReconciliationRepository } from '../../core/repository';
import { StatusReconciliationEntity } from '../../core/entity';
import { Observable, of } from 'rxjs';
import { ApiRepositoryService } from './api.service';
import { API } from '../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class StatusReconciliationService extends StatusReconciliationRepository {
  statusReconciliation: StatusReconciliationEntity[] = [];

  constructor(private apiRepositoryService: ApiRepositoryService) {
    super();
  }

  public getAll(): Observable<StatusReconciliationEntity[]> {
    const path = API.API_RECONCILIATION.GET_STATUS_RECONCILIATION;
    // return of(this.statusReconciliation);
    return this.apiRepositoryService.getData(path);
  }
}
