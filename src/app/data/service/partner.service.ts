import { Injectable } from '@angular/core';
import { PartnerRepository } from '../../core/repository';
import { PartnerEntity } from '../../core/entity';
import { Observable, of } from 'rxjs';
import { ApiRepositoryService } from './api.service';
import { API } from '../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class PartnerService extends PartnerRepository {
  partnerCodes: PartnerEntity[] = [
    { id: 0, partnerName: 'Tất cả', partnerCode: '' },
    { id: 1, partnerName: 'Napas', partnerCode: '' },
    { id: 2, partnerName: 'ACV', partnerCode: '' },
  ];

  constructor(private apiRepositoryService: ApiRepositoryService) {
    super();
  }
  public getAll(): Observable<PartnerEntity[]> {
    const path = API.API_RECONCILIATION.GET_PARTNERS;
    // return of(this.partnerCodes);
    return this.apiRepositoryService.getData(path);
  }
}
