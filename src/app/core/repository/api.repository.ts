import { Observable } from 'rxjs';

export abstract class ApiRepository {
  public abstract postData(
    path: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    body: {},
    authorization: boolean
  ): Observable<any>;
  public abstract patchData(
    path: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    body: {},
    authorization: boolean
  ): Observable<any>;
  public abstract getData(
    path: string,
    authorization: boolean
  ): Observable<any>;
  public abstract deleteData(
    path: string,
    authorization: boolean
  ): Observable<any>;
}
