export class PayLoadGetReconciliationDto {
  constructor(
    public partnerCode: string,
    public typeService: string,
    public status: string,
    public keyword: string,
    public startDate: string,
    public endDate: string,
    public pageIndex: number,
    public pageSize: number
  ) {}
}
