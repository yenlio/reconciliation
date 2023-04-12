export class ReconciliationNapasEntity {
  constructor(
    public transactionId: string,
    public status: string,
    public merchantCode: string,
    public merchantName: string,
    public transactionDate: string,
    public rcNapasId: string,
    public rcEpayId: string,
    public rcEpayAmount: number,
    public rcEpayStatus: string,
    public rcNapasAmount: number,
    public rcNapasStatus: string,
    public rcNapasStatusDescription: string,
    public rcEpayStatusDescription: string
  ) {}
}
