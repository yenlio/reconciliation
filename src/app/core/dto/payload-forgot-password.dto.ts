export class PayLoadForgotPassword {
  constructor(
    public functionType: number,
    public transactionID: string,
    public userName: string | null,
    public email: string | null
  ) {}
}
