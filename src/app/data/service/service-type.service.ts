import { Injectable } from '@angular/core';
import { ServiceTypeRepository } from '../../core/repository';
import { ServiceTypeEntity } from '../../core/entity';
import { Observable, of } from 'rxjs';
import { ApiRepositoryService } from './api.service';
import { API } from '../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class ServiceTypeService extends ServiceTypeRepository {
  serviceTypes: ServiceTypeEntity[] = [
    { id: 0, name: 'Tất cả', code: '' },
    { id: 1, name: 'Dịch vụ A', code: '1' },
    { id: 2, name: 'Dịch vụ B', code: '1' },
  ];

  constructor(private apiRepositoryService: ApiRepositoryService) {
    super();
  }

  public getAll(): Observable<ServiceTypeEntity[]> {
    const path = API.API_RECONCILIATION.GET_SERVICE_TYPES;
    // return of(this.serviceTypes);
    return this.apiRepositoryService.getData(path);
  }
}
