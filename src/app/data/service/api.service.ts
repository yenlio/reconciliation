import { Injectable } from '@angular/core';
import { ApiRepository } from 'src/app/core/repository';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiRepositoryService extends ApiRepository {
  domainApiUrl = environment.domainAPI;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public postData(
    path: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    body: {}
  ): Observable<any> {
    const url = `${this.domainApiUrl}/${path}`;
    return this.httpClient.post(url, body);
  }

  public postDataFile(
    path: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    body: {}
  ): Observable<any> {
    const url = `${this.domainApiUrl}/${path}`;

    return this.httpClient.post(url, body, { responseType: 'blob' });
  }

  public patchData(
    path: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    body: {},
    authorization = false
  ): Observable<any> {
    const url = `${this.domainApiUrl}/${path}`;
    const headers: any = {};
    if (authorization) {
      headers['Authorization'] = `${localStorage.getItem('accessToken')}`;
    }
    return this.httpClient.patch(url, body, { headers: headers });
  }
  public getData(path: string): Observable<any> {
    const url = `${this.domainApiUrl}/${path}`;
    return this.httpClient.get(url);
  }

  public deleteData(data: string): Observable<any> {
    const path = API.API_RECONCILIATION.USER;
    const url = `${this.domainApiUrl}/${path}/${data}`;
    return this.httpClient.delete(url);
  }
}
