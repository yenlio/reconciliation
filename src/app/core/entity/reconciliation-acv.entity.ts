export class ReconciliationACVEntity {
  constructor(
    public transactionId: string,
    public status: string,
    public plateNumber: string,
    public ticketCode: string,
    public laneID: number,
    public transactionDate: string,
    public rcACVId: string,
    public rcEpayId: string,
    public rcEpayAmount: number,
    public rcEpayStatus: string,
    public rcAcvAmount: number,
    public rcACVStatus: string,
    public rcACVStatusDescription: string,
    public rcEpayStatusDescription: string
  ) {}
}
