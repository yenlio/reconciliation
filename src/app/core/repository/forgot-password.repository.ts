import { Observable } from 'rxjs';
import { GenOTPResponse, PayLoadForgotPassword } from '../dto';
export abstract class ForgotPasswordRepository {
  public abstract genOTP(
    payload: PayLoadForgotPassword
  ): Observable<GenOTPResponse>;

  public abstract confirmOTP(payload: any): Observable<GenOTPResponse>;
  public abstract createPassword(payload: any): Observable<GenOTPResponse>;
}
