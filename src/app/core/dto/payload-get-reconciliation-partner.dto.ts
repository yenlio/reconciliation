export class PayLoadGetReconciliationPartnerDto {
  constructor(
    public partnerCode: string,
    public startDate: string | null | undefined,
    public endDate: string | null | undefined,
    public pageIndex: number,
    public pageSize: number,
    public statusCode: string | null | undefined,
  ) {}
}
