export class GenOTPResponse {
  constructor(
    public errorCode: number,
    public errorMessage: string,
    public msgType: string,
    public responseTime: string,
    public transactionID: string
  ) {}
}
