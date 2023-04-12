import { Observable } from 'rxjs';
export interface IUseCase<S, T> {
  execute(param: S): Observable<T>;
}
